import { Button } from "@/components";

interface BackButtonProps {
  show: boolean;
  onClick: () => void;
}

export function BackButton({ show, onClick }: BackButtonProps) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto mb-10 flex max-w-xl items-center justify-between px-14">
      {show && (
        <Button onClick={onClick} className="transition hover:brightness-125">
          Voltar
        </Button>
      )}
    </div>
  );
}
