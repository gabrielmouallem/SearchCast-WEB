import { Button } from "@/components";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/hooks/useAuth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function ProfilePopover() {
  const { handleLogout, user } = useAuth();

  const name = user?.name ?? "";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <Avatar name={name} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-dark-gray rounded-lg p-4"
        >
          <DropdownMenu.Item className="cursor-pointer mb-4">
            <Button className="w-full" as="a" href="/profile">
              Meu Perfil
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
