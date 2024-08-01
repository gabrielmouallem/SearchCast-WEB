import Image from "next/image";

interface CardProps {
  iconSrc: string;
  title: string;
  description: string;
}

export function Card({ iconSrc, title, description }: CardProps) {
  return (
    <div className="flex flex-1 flex-col content-center items-center gap-5 text-center">
      <Image
        src={iconSrc}
        width={48}
        height={48}
        placeholder="empty"
        alt="Card Icon"
      />
      <div className="flex flex-col content-center items-center gap-2 text-center">
        <div className="text-xl font-semibold leading-7">{title}</div>
        <div className="text-base font-normal leading-6 text-text-secondary">
          {description}
        </div>
      </div>
    </div>
  );
}
