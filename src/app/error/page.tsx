"use client";

import { useState, useEffect } from "react";

export default function ErrorPage() {
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the '#' at the start
    const params = new URLSearchParams(hash);

    setError(params.get("error"));
    setErrorCode(params.get("error_code"));
    setErrorDescription(params.get("error_description"));
  }, []);

  return (
    <div className="flex h-[70vh] w-screen items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Ops! Algo deu errado.
        </h1>
        {error && (
          <p className="mt-2 text-lg text-text-secondary">Erro: {error}</p>
        )}
        {errorCode && (
          <p className="mt-2 text-lg text-text-secondary">
            Código de erro: {errorCode}
          </p>
        )}
        <p className="mt-4 text-base text-text-secondary">
          {errorDescription
            ? decodeURIComponent(errorDescription).replace(/\+/g, " ")
            : "Desculpe, houve algum problema e não conseguimos encontrar a página que você está procurando."}
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
