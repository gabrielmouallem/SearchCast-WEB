"use client";
import { Button } from "@/components";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import * as Popover from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";

interface ProfilePopoverProps {
  restrictedMode?: boolean;
}

export function ProfilePopover({ restrictedMode }: ProfilePopoverProps) {
  const { handleLogout } = useAuth();
  const pathname = usePathname();
  const user = useUser();

  const name = user?.name ?? "";
  const hasAccess = user?.subscription || user?.allow_unpaid_access;

  const buttons = [
    { label: "Pesquisar", href: "/search", condition: hasAccess },
    { label: "Meu Perfil", href: "/profile", condition: true },
    { label: "Planos", href: "/plans", condition: true },
    { label: "Ajuda", href: "/guide", condition: true },
  ];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div>
          <Avatar name={name} />
        </div>
      </Popover.Trigger>

      {user && (
        <Popover.Portal>
          <Popover.Content
            sideOffset={5}
            className="z-50 rounded-lg bg-dark-gray p-4"
          >
            {!restrictedMode && (
              <>
                {!hasAccess && (
                  <div className="mb-4 cursor-pointer">
                    <Button
                      className="w-full !bg-brand"
                      as="a"
                      href="/onboarding?initialStep=3"
                    >
                      Experimente Gratuitamente!
                    </Button>
                  </div>
                )}
                {buttons
                  .filter((button) => button.condition)
                  .map((button) => (
                    <div key={button.href} className="mb-4 cursor-pointer">
                      <Button
                        className={`w-full ${
                          pathname === button.href
                            ? "border-2 border-brand"
                            : ""
                        }`}
                        as="a"
                        href={button.href}
                      >
                        {button.label}
                      </Button>
                    </div>
                  ))}
              </>
            )}
            <div className="cursor-pointer">
              <Button className="w-full" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
