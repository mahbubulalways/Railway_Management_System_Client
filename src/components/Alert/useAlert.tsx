"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type FC,
} from "react";

import { createPortal } from "react-dom";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

type AlertType = "success" | "warning" | "error";

interface AlertProps {
  type: AlertType;
  title: string;
  description?: string;
  autoClose?: number;
  showCloseButton?: boolean;
}

interface ConfirmProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface AlertContextType {
  showAlert: (alert: AlertProps) => void;
  hideAlert: () => void;
  showConfirm: (confirm: ConfirmProps) => void;
  hideConfirm: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [confirm, setConfirm] = useState<ConfirmProps | null>(null);
  const showAlert = useCallback((data: AlertProps) => setAlert(data), []);
  const hideAlert = useCallback(() => setAlert(null), []);
  const showConfirm = useCallback((data: ConfirmProps) => setConfirm(data), []);
  const hideConfirm = useCallback(() => setConfirm(null), []);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
        showConfirm,
        hideConfirm,
      }}
    >
      {children}

      {alert && <GlobalAlert alert={alert} onClose={hideAlert} />}

      {confirm && <ConfirmModal confirm={confirm} onClose={hideConfirm} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);

  if (!ctx) throw new Error("useAlert must be used inside AlertProvider");

  return ctx;
};

const ModalWrapper: FC<{
  children: ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-200"
      >
        {children}
      </div>
    </div>,

    document.body,
  );
};

const iconStyle = {
  success: (
    <div className=" flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
      <CheckCircle2 size={45} className="text-[#006A4E]" />
    </div>
  ),

  warning: (
    <div className=" flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
      <AlertTriangle size={45} className="text-yellow-500" />
    </div>
  ),

  error: (
    <div className=" flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
      <XCircle size={45} className="text-red-500" />
    </div>
  ),
};

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600 active:scale-90"
  >
    <X size={16} />
  </button>
);

const GlobalAlert: FC<{
  alert: AlertProps;
  onClose: () => void;
}> = ({ alert, onClose }) => {
  useEffect(() => {
    if (!alert.autoClose) return;

    const timer = setTimeout(onClose, alert.autoClose);

    return () => clearTimeout(timer);
  }, [alert.autoClose, onClose]);

  return (
    <ModalWrapper onClose={onClose}>
      {alert.showCloseButton !== false && <CloseButton onClose={onClose} />}

      <div className=" flex flex-col items-center text-center gap-4">
        {iconStyle[alert.type]}
        <h2 className="text-xl font-bold text-gray-900">{alert.title}</h2>
        {alert.description && (
          <p className="text-sm text-gray-500 leading-6">{alert.description}</p>
        )}
      </div>
    </ModalWrapper>
  );
};

const ConfirmModal: FC<{
  confirm: ConfirmProps;
  onClose: () => void;
}> = ({ confirm, onClose }) => {
  const confirmAction = () => {
    confirm.onConfirm();

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <CloseButton onClose={onClose} />
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#006A4E]/10">
          <AlertTriangle size={42} className="text-[#006A4E]" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-gray-900">
          {confirm.title}
        </h2>

        {confirm.description && (
          <p className="mt-3 text-sm text-gray-500">{confirm.description}</p>
        )}

        <div className="mt-7 flex gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-xl bg-gray-100 py-3 font-semibold text-gray-700 hover:bg-gray-200 transition"
          >
            {confirm.cancelText || "Cancel"}
          </button>

          <button
            onClick={confirmAction}
            className="flex-1 cursor-pointer rounded-xl bg-[#006A4E] py-3
            font-semibold text-white shadow-lg shadow-[#006A4E]/20 hover:bg-[#00563f] transition"
          >
            {confirm.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
