import Image from "next/image";

interface ProfileCardProps {
  profileSrc: string;
  name: string;
  role: string;
}

export function ProfileCard({ profileSrc, name, role }: ProfileCardProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center justify-center">
      <Image
        className="rounded-full"
        src={profileSrc}
        width={64}
        height={64}
        placeholder="empty"
        alt="Card Icon"
      />
      <div className="text-lg">{name}</div>
      <div className="text-text-secondary">{role}</div>
    </div>
  );
}
