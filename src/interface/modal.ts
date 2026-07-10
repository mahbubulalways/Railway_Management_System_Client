import { ReactNode, RefObject } from "react";
export type TModalWidth = "sm" | "md" | "lg" | "xl" | "full";
export type TCustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  width?: TModalWidth;
  ref?: RefObject<HTMLDivElement | null>;
};
