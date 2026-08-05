import Link from "next/link";
import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type TLink = {
  id: number;
  label: string;
  path: string;
};

type TButton = {
  id: number;
  title: string;
  onClick: () => void;
};

type TActionButtonProps = {
  links?: TLink[];
  buttons?: TButton[];
};

export function ActionButton({ links = [], buttons = [] }: TActionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-md p-1 outline-none hover:bg-muted"
        >
          <MoreVertical size={20} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {buttons.length > 0 && (
          <DropdownMenuGroup>
            {buttons.map(({ id, title, onClick }) => (
              <DropdownMenuItem
                key={id}
                onClick={onClick}
                className="cursor-pointer"
              >
                {title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}

        {/* {buttons.length > 0 && links.length > 0 && <DropdownMenuSeparator />} */}

        {links.length > 0 && (
          <DropdownMenuGroup>
            {links.map(({ id, label, path }) => (
              <DropdownMenuItem key={id} asChild>
                <Link href={path}>{label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
