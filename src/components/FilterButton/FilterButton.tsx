"use client";
import { FilterOptions } from "@/types";
import * as Popover from "@radix-ui/react-popover";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const [width, setWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const updateWidth = () => setWidth(button.offsetWidth);

    // Initial width setting
    updateWidth();

    // Create a MutationObserver to detect changes in the button
    const observer = new MutationObserver(updateWidth);

    observer.observe(button, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Add a resize event listener to update the width on window resize
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleToggle = () => setIsOpen((state) => !state);

  const handleClick = (optionValue: T) => () => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as unknown as T);
  };

  if (isMobile) {
    return (
      <select
        disabled={disabled}
        value={value ? (value as string) : ""}
        onChange={handleSelectChange}
        className={`w-fit appearance-none rounded-full border border-solid border-border bg-background px-4 py-2 pr-4 text-sm text-gray-300 hover:border-gray-600 disabled:pointer-events-none disabled:opacity-30`}
      >
        <option value="" disabled>
          {children}
        </option>
        {options.map(({ value: optionValue, label: optionLabel }, index) => (
          <option key={index} value={optionValue as unknown as string}>
            Ordenar por: {optionLabel?.toLowerCase()}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger asChild>
        <button
          className={`w-fit rounded-full border border-solid border-border bg-background px-4 py-2 text-sm text-gray-300 hover:border-gray-600 disabled:pointer-events-none disabled:opacity-30`}
          ref={buttonRef}
          onClick={handleToggle}
          title={disabled ? "Funcionalidade indisponível" : ""}
          disabled={disabled}
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
        style={{ width: width ? `${width}px` : "auto" }}
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
