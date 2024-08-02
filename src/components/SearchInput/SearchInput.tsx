import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchTextSuggestions } from "@/hooks";
import { getBoldText } from "@/utils/shared";
import { Input } from "@/components/Input";

type SearchInputProps = React.ComponentProps<"input"> & {
  onSuggestionClick?: (value: string) => void;
};

export function SearchInput({ onSuggestionClick, ...props }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textValue = props?.value as string;
  const { data } = useSearchTextSuggestions(textValue ?? "");

  useEffect(() => {
    if (props?.disabled) setIsFocused(false);
  }, [props.disabled]);

  const suggestions =
    data?.suggestionGroups?.[0]?.searchSuggestions.map(
      (el) => el.displayText,
    ) ?? [];

  return (
    <div
      className={`relative flex w-screen items-center justify-center px-5 ${props.disabled ? "opacity-50" : ""}`}
    >
      <div className="relative w-full md:w-auto">
        <Input
          {...props}
          className="w-full max-w-full rounded-md py-2 pl-3 pr-10 placeholder-text-primary md:w-500px"
          placeholder="Pesquise seu podcast"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className="absolute inset-y-0 right-0 z-50 flex cursor-pointer items-center pl-8 pr-3"
          type="submit"
        >
          <Image src="/search_icon.svg" alt="Search" width={24} height={24} />
        </button>
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul
          className={`absolute top-[48px] z-50 mx-4 w-[calc(100%-24px)] rounded-md border border-solid border-border bg-background py-3 text-text-primary [translate-y:50%] md:w-500px`} // ${showImproveTextButton ? "md:mr-[52px]" : ""}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() =>
                onSuggestionClick && onSuggestionClick(suggestion)
              }
              className={`cursor-pointer border-b px-3 py-2 hover:bg-slate-900 ${
                suggestions.length - 1 !== index
                  ? "border-border"
                  : "border-none"
              }`}
            >
              {getBoldText(textValue ?? "", suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
