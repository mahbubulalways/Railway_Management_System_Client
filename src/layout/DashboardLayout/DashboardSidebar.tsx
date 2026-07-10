"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { adminSidebarItems, ISidebarItem } from "./sidebarItems";

const AdminSidebarDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const pathname = usePathname();

  const toggle = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const active = (path: string) => pathname === path;

  return (
    <>
      {/* overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
        fixed inset-0
        bg-black/40
        z-40
        lg:hidden
        "
        />
      )}

      <aside
        className={`
    fixed
    top-0
    left-0
    z-50
    h-screen
    w-72
    bg-[#006A4E]
    transition-transform
    duration-300

    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

    `}
      >
        <div className="p-5">
          <div
            className="
      flex
      justify-between
      items-center
      border-b
      border-white/20
      pb-5
      mb-5
      "
          >
            <div>
              <h1
                className="
        text-white
        font-bold
        text-xl
        "
              >
                Railway
              </h1>

              <p className="text-green-100 text-xs">Admin Panel</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div
            className="
  h-[calc(100vh-120px)]
  overflow-y-auto
  space-y-1
  pr-3
  scrollbar-thin
  scrollbar-thumb-white/30
  scrollbar-track-transparent
  "
          >
            {adminSidebarItems.map((item: ISidebarItem) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggle(item.label)}
                      className={`
        w-full
        flex
        justify-between
        items-center
        px-3
        py-2.5
        rounded-xl
        text-[18px]
        font-medium
        cursor-pointer

        ${
          item.children.some((c) => c.path === pathname)
            ? "bg-white/20 text-white"
            : "text-green-50 hover:bg-white/10"
        }

        `}
                    >
                      {item.label}

                      <ChevronDown
                        size={16}
                        className={openMenu === item.label ? "rotate-180" : ""}
                      />
                    </button>

                    <div
                      className={`
        overflow-hidden
        transition-all
        ${openMenu === item.label ? "max-h-96" : "max-h-0"}
        `}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.path!}
                          onClick={() => setOpen(false)}
                          className={`
        flex
        gap-2
        items-center
        mt-1
        ml-3
        px-3
        py-2
        rounded-lg
        text-[17px]

        ${
          active(child.path!)
            ? "bg-white text-[#006A4E]"
            : "text-green-100 hover:bg-white/10"
        }

        `}
                        >
                          <ChevronRight size={14} />

                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.path!}
                    onClick={() => setOpen(false)}
                    className={`
        block
        px-3
        py-2.5
        rounded-xl
        text-[18px]
        font-medium

        ${
          active(item.path!)
            ? "bg-white text-[#006A4E]"
            : "text-green-50 hover:bg-white/10"
        }

        `}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebarDrawer;
