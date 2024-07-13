import { Button, Input } from "@/components";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

export function ProfileForm() {
  const { getUser } = useAuth();
  const user = useMemo(() => getUser(), [getUser]);

  const name = user?.name ?? "";
  const firstName = name?.split(" ").at(0);
  const lastName = name?.split(" ").at(1);

  return (
    <div className="mb-20 mt-20 flex flex-grow flex-col items-center px-3 pb-24 pt-12 lg:px-0">
      <div className="flex w-full flex-col gap-6 sm:w-[640px]">
        <div className="w-full">
          <div className="text-lg font-semibold leading-7 text-neutral-100">
            Informações pessoais
          </div>
          <div className="text-sm font-normal leading-tight text-neutral-400">
            Atualize suas informações e sua foto de perfil.
          </div>
        </div>
        <div className="inline-flex items-start justify-start gap-6 rounded-md border border-gray-800 p-6">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-1 items-center justify-center">
              <Avatar name={name} size="large" />
            </div>
            <div className="flex w-full flex-1 gap-6">
              <div className="flex-1">
                <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
                  Nome
                </div>
                <Input
                  readOnly
                  className="w-full"
                  type="text"
                  placeholder="Nome"
                  value={firstName}
                />
              </div>
              <div className="flex-1">
                <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
                  Sobrenome
                </div>
                <Input
                  readOnly
                  className="w-full"
                  type="text"
                  placeholder="Sobrenome"
                  value={lastName}
                />
              </div>
            </div>
            <div className="">
              <div className="mb-[5px] text-sm font-medium leading-5 text-gray-300">
                Email
              </div>
              <Input
                readOnly
                className="w-full"
                type="text"
                placeholder="Email"
                value={user?.email}
              />
            </div>
            <div className="h-[1px] w-full flex-1 border-b border-gray-800" />
            <div className="flex w-full justify-end gap-3">
              <Button disabled>Cancelar</Button>
              <Button
                className="!bg-brand"
                disabled
                title="A edição de perfil está desabilitada temporariamente."
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
