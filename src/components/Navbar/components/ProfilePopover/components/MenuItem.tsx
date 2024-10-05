import React from "react";

const iconsSwitchCase = {
  "/search": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  ),
  "/profile": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  ),
  "/plans": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
      />
    </svg>
  ),
  "/guide": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  "/logout": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 rotate-180"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
      />
    </svg>
  ),
  "/": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
      />
    </svg>
  ),
};

type MenuItemProps =
  | {
      key?: string;
      href: string;
      isSelected?: boolean;
      children: React.ReactNode;
      onClick?: () => void;
    }
  | {
      key?: string;
      onClick?: () => void;
      children: React.ReactNode;
    };

export function MenuItemIcon({
  icon,
}: {
  icon: "/search" | "/profile" | "/plans" | "/guide" | "/logout" | "/";
}) {
  return <div className="ml-auto">{iconsSwitchCase?.[icon] || ""}</div>;
}

export function MenuItem(props: MenuItemProps) {
  const isLink = (
    props: MenuItemProps,
  ): props is {
    href: string;
    isSelected?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
  } => {
    return "href" in props && "isSelected" in props;
  };

  if (isLink(props)) {
    const { key, href, isSelected, children, onClick } = props;
    return (
      <a
        key={key}
        href={href}
        onClick={onClick}
        className={`mr-10 flex cursor-pointer items-center text-sm font-light text-[#D0D0D1] [width:calc(100%)] hover:font-normal sm:mx-3 sm:[width:calc(100%-24px)] ${isSelected ? "bg-background text-text-primary" : "bg-[#080C14]"} rounded-md px-2 py-2.5 hover:bg-background hover:text-text-primary`}
      >
        {children}
      </a>
    );
  }

  const { key, onClick, children } = props;
  return (
    <div
      key={key}
      onClick={onClick}
      className="mr-10 flex cursor-pointer items-center rounded-md bg-[#080C14] px-2 py-2.5 text-sm font-light text-[#D0D0D1] [width:calc(100%)] hover:bg-background hover:font-normal hover:text-text-primary sm:mx-3 sm:[width:calc(100%-24px)]"
    >
      {children}
    </div>
  );
}
