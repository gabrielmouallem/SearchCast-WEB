export default function ErrorPage() {
  return (
    <div className="flex h-[70vh] w-screen items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Ops! Algo deu errado.
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          Desculpe, houve algum problema e não conseguimos encontrar a página
          que você está procurando.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block text-base text-blue-500 underline"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
