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
    <div className="px-3 lg:px-0 flex-grow flex flex-col items-center mb-20 mt-20 pt-12 pb-24">
      <div className="w-full sm:w-[640px] flex flex-col gap-6">
        <div className="w-full">
          <div className="text-neutral-100 text-lg font-semibold leading-7">
            Informações pessoais
          </div>
          <div className="text-neutral-400 text-sm font-normal leading-tight">
            Atualize suas informações e sua foto de perfil.
          </div>
        </div>
        <div className="p-6 justify-start items-start gap-6 inline-flex border border-gray-800 rounded-md">
          <div className="flex flex-col w-full gap-6">
            <div className="flex w-full flex-1 items-center justify-center">
              <Avatar name={name} size="large" />
            </div>
            <div className="flex flex-1 w-full gap-6">
              <div className="flex-1">
                <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
                <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
              <div className="text-sm text-gray-300 font-medium leading-5 mb-[5px]">
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
            <div className="flex-1 w-full h-[1px] border-b border-gray-800" />
            <div className="w-full flex justify-end gap-3 ">
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
