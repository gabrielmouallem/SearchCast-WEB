import React, { ComponentProps, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Spinner } from "@/components";

const ClipboardIcon = ({ ...props }: ComponentProps<"svg">) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`size-6 ${props?.className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
    />
  </svg>
);

export function CopyToClipboard({ text }: { text: string }) {
  const [loading, setIsLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const isTooltipOpen = copied || loading || isHover;

  const handleCopy = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigator.clipboard.writeText(text).then(() => {
        setIsLoading(false);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }, 500);
  };

  const handleHover = (value: boolean) => () => setIsHover(value);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={isTooltipOpen}>
        <Tooltip.Trigger
          asChild
          onMouseOver={handleHover(true)}
          onMouseOut={handleHover(false)}
          onMouseLeave={handleHover(false)}
        >
          <button
            onClick={handleCopy}
            className={`scale-75 rounded border-border p-2 font-semibold text-white ${
              copied ? "bg-green-500" : "bg-[#333741] hover:bg-[#28438D]"
            } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <Spinner width={24} height={24} fill="#F5F5F6" />
            ) : (
              <ClipboardIcon className="h-6 w-6" />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="rounded-md bg-[#05070d] p-2 text-xs text-text-primary">
            {copied
              ? "Texto copiado!"
              : loading
                ? "Copiando..."
                : "Copiar texto."}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
