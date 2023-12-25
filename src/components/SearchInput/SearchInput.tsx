import Image from "next/image";
import { Input } from "..";

type SearchInputProps = React.ComponentProps<"input">;

export function SearchInput({ ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        {...props}
        className="pl-3 pr-10 py-2 rounded-md w-360px md:w-500px placeholder-text-primary"
        placeholder="Pesquise seu podcast"
      />
      <button
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-50 pl-8"
        type="submit"
      >
        <Image src="/search_icon.svg" alt="Search" width={24} height={24} />
      </button>
    </div>
  );
}
