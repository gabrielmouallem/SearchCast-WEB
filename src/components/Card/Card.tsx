import Image from "next/image";

interface CardProps {
  iconSrc: string;
  title: string;
  description: string;
}

export function Card({ iconSrc, title, description }: CardProps) {
  return (
    <div className="w-96 flex flex-col items-center content-center text-center gap-5">
      <Image
        src={iconSrc}
        width={48}
        height={48}
        placeholder="empty"
        alt="Card Icon"
      />
      <div className="flex flex-col items-center content-center text-center gap-2">
        <div className="text-xl font-semibold leading-7">{title}</div>
        <div className="text-text-secondary text-base font-normal leading-6">
          {description}
        </div>
      </div>
    </div>
  );
}
