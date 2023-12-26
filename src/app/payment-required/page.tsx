import { Button, Navbar } from "@/components";

export default function PaymentRequired() {
  const phoneNumber = "+5535998607515";
  const learnMoreMessage = encodeURIComponent(
    "Olá, gostaria de saber mais sobre a subscrição na ferramenta SearchCast."
  );

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="max-w-sm flex flex-col items-center justify-center text-center gap-4">
          <div className="text-xl font-bold">ATENÇÃO!</div>
          <div className="font-light">
            Para utilizar nossa plataforma além do cadastro você precisa
            realizar a subscrição (pagamento) da funcionalidade.
          </div>
          <div className="font-light">
            Para mais informações clique no <br></br>botão abaixo:
          </div>
          <a
            href={`https://wa.me/${phoneNumber}?text=${learnMoreMessage}`}
            target="_blank"
          >
            <Button className=" !bg-brand">Entre em Contato</Button>
          </a>
        </div>
      </div>
    </>
  );
}
