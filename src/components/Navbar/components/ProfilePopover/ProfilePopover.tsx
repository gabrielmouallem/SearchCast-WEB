"use client";
import { Button } from "@/components";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/hooks/useAuth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMemo } from "react";

export function ProfilePopover() {
  const { getUser, handleLogout } = useAuth();
  const user = useMemo(() => getUser(), [getUser]);

  const name = user?.name ?? "";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div>
          <Avatar name={name} />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="rounded-lg bg-dark-gray p-4"
        >
          <DropdownMenu.Item className="mb-4 cursor-pointer">
            <Button className="w-full" as="a" href="/search">
              Pesquisar
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mb-4 cursor-pointer">
            <Button className="w-full" as="a" href="/profile">
              Meu Perfil
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mb-4 cursor-pointer">
            <Button className="w-full" as="a" href="/plans">
              Planos
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="cursor-pointer">
            <Button className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
