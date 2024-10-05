"use client";
import { Button } from "@/components";
import { Avatar } from "@/components/Avatar";
import { useUser } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import * as Popover from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useIsMounted } from "@/hooks/useIsMounted";
import { MenuItem, MenuItemIcon } from "./components";
import posthog from "posthog-js";

export function ProfilePopover() {
  const { handleLogout } = useAuth();
  const pathname = usePathname();
  const user = useUser();
  const isMounted = useIsMounted();

  const name = user?.user_metadata?.full_name ?? "";
  const hasAccess =
    user?.user_metadata?.subscription ||
    user?.user_metadata?.allow_unpaid_access ||
    user?.user_metadata?.allow_beta_access;

  const hasLimitedAccess = !hasAccess;

  const searchHref = hasLimitedAccess ? "/join-beta" : "/search";

  const MENU_ITEMS = [
    { label: "Pesquisar", href: "/search", divider: false },
    { label: "Meu Perfil", href: "/profile", divider: true },
    { label: "Ajuda", href: "/guide", divider: false },
    { label: "Pagina Inicial", href: "/", divider: true },
  ];

  const isBetaProgramEnabled = Boolean(
    posthog.isFeatureEnabled("beta-program"),
  );

  if (!isBetaProgramEnabled) {
    MENU_ITEMS.splice(2, 0, {
      label: "Planos",
      href: "/plans",
      divider: false,
    });
  }

  if (!isMounted) {
    return <Avatar name={name} isLoading />;
  }

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
            className="relative z-50 mr-2 flex h-screen w-screen flex-col rounded-lg border border-dark-gray bg-[#080C14] px-4 pb-4 pt-8 sm:mr-4 sm:h-fit sm:w-64 sm:px-0"
          >
            {MENU_ITEMS.map((item) => (
              <>
                {item.divider && (
                  <div className="my-2 h-[1px] w-full border-b border-dark-gray" />
                )}
                <MenuItem
                  key={item.href}
                  href={item.href === "/search" ? searchHref : item.href}
                  isSelected={pathname === item.href}
                >
                  {item.label}
                  <MenuItemIcon
                    icon={item.href.replace("?initialStep=3", "") as any}
                  />
                </MenuItem>
              </>
            ))}
            <div className="my-2 h-[1px] w-full border-b border-dark-gray" />
            <MenuItem onClick={handleLogout}>
              Sair
              <MenuItemIcon icon="/logout" />
            </MenuItem>
            <div className="my-2 h-[1px] w-full border-b border-dark-gray" />
            <div className="cursor-pointer">
              <Button
                as="a"
                href="mailto:contato@searchcast.app"
                className="mx-3 mt-2 h-10 text-sm font-extralight [width:calc(100%-24px)]"
              >
                Contato
              </Button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
