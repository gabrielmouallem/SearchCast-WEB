interface AvatarProps {
  name: string;
  size?: "default" | "large";
}

export function Avatar({ name, size = "default" }: AvatarProps) {
  const firstNameLetter = name?.charAt(0) ?? "";
  const lastNameLetter = name?.split(" ")?.at(1)?.charAt(0) ?? "";
  const isLarge = size === "large";

  return (
    <button
      className={`flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-500 text-lg font-semibold text-gray-800 ${
        isLarge ? "pointer-events-none m-5 scale-[2]" : ""
      }`}
    >
      {firstNameLetter}
      {lastNameLetter}
    </button>
  );
}
