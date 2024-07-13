import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "..";
import { useSearchTestSuggestions } from "@/hooks";
import { getBoldText } from "@/utils";

type SearchInputProps = React.ComponentProps<"input"> & {
  onSuggestionClick?: (value: string) => void;
};

export function SearchInput({ onSuggestionClick, ...props }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textValue = props?.value as string;
  const { data } = useSearchTestSuggestions(textValue ?? "");

  useEffect(() => {
    if (props?.disabled) setIsFocused(false);
  }, [props.disabled]);

  const suggestions =
    data?.suggestionGroups?.[0]?.searchSuggestions.map(
      (el) => el.displayText,
    ) ?? [];

  return (
    <div className="relative">
      <Input
        {...props}
        className="w-360px rounded-md py-2 pl-3 pr-10 placeholder-text-primary md:w-500px"
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
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-360px rounded-md border border-solid border-border bg-background py-3 text-text-primary md:w-500px">
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
