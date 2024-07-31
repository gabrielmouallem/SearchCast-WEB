"use client";
import { FilterOptions } from "@/types";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

interface FilterButtonProps<T = string> {
  disabled?: boolean;
  children: React.ReactNode;
  options: FilterOptions<T>[];
  value: T | undefined | null;
  onSelect: (value: T) => void;
}

export function FilterButton<T = string>({
  disabled,
  children,
  options,
  value,
  onSelect,
}: FilterButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleToggle = () => setIsOpen((state) => !state);

  const handleClick = (optionValue: T) => () => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger asChild>
        <button
          onClick={handleToggle}
          title={disabled ? "Funcionalidade indisponível" : ""}
          disabled={disabled}
          className={`w-fit rounded-full border border-solid border-border bg-background px-4 py-2 text-sm text-gray-300 hover:border-gray-600 disabled:pointer-events-none disabled:opacity-30`}
        >
          {children}
        </button>
      </Popover.Trigger>
      <Popover.Content
        className="z-50 rounded-md border border-solid border-border bg-background text-text-primary"
        align="center"
        side="bottom"
        sideOffset={5}
        onInteractOutside={handleClose}
      >
        <ul className="mt-2 max-h-96 scroll-m-0 overflow-auto">
          {options.map(({ value: optionValue, label: optionLabel }, index) => {
            const isSelected =
              JSON.stringify(value) === JSON.stringify(optionValue);

            return (
              <li
                onClick={handleClick(optionValue)}
                key={index}
                className={`z-50 cursor-pointer border-b px-3 py-2 text-sm text-gray-300 hover:bg-slate-900 ${
                  options.length - 1 !== index ? "border-border" : "border-none"
                } ${isSelected ? "bg-slate-800 hover:bg-slate-800" : ""}`}
              >
                {optionLabel}
              </li>
            );
          })}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
