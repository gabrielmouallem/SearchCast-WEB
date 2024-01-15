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
      className={`flex items-center justify-center rounded-full w-[40px] h-[40px] bg-gray-500 text-gray-800 text-lg font-semibold ${
        isLarge ? "scale-[2] m-5 pointer-events-none" : ""
      }`}
    >
      {firstNameLetter}
      {lastNameLetter}
    </button>
  );
}
