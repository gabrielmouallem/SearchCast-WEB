import Image from "next/image";
import { Input } from "..";

type SearchInputProps = React.ComponentProps<"input">;

export function SearchInput({ ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Image src="/search_icon.svg" alt="Search" width={24} height={24} />
      </div>
      <Input
        {...props}
        className="pl-10 pr-3 py-2 rounded-md w-360px md:w-500px placeholder-text-primary"
        placeholder="Pesquise seu podcast"
      />
    </div>
  );
}
