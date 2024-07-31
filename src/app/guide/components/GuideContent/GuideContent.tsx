export function GuideContent() {
  return (
    <div className="mx-auto max-w-screen-md p-10 pt-0">
      <h1 className="my-6 text-3xl font-bold">Sobre a Plataforma</h1>

      <p className="my-6">
        Bem-vindo ao SearchCast! O SearchCast é um aplicativo web onde os
        usuários podem pesquisar nomes, palavras-chave ou qualquer termo, e a
        plataforma retorna vídeos do YouTube dos maiores podcasts brasileiros
        que mencionam a palavra-chave pesquisada em determinados momentos do
        vídeo. Assim, o usuário pode ir diretamente ao trecho do vídeo em que o
        assunto de seu interesse está sendo comentado, transformando a
        experiência de escutar podcasts.
      </p>

      <p className="my-6">
        <b>O.B.S.: </b> Este guia tem o intuito de ensinar como pesquisar na
        plataforma. Caso esteja interessado em ver a plataforma funcionando,
        você pode fazer o login na plataforma e acessar a página{" "}
        <a
          href="/onboarding"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          https://searchcast.app/onboarding
        </a>{" "}
        para experimentar o app.
      </p>

      <p className="my-8">
        Para maiores dúvidas ou contato, envie um e-mail para{" "}
        <a href="mailto:contato@searchcast.app" className="text-blue-500">
          contato@searchcast.app
        </a>
        .
      </p>

      <p className="my-6">Os podcasts disponíveis na plataforma incluem:</p>
      <ul className="my-6 list-inside list-disc">
        <li>Inteligência Ltda</li>
        <li>PodPeople - Ana Beatriz Barbosa</li>
        <li>Flow Podcast</li>
        <li>Podpah</li>
        <li>AchismosTV</li>
        <li>Joel Jota</li>
        <li>Renato Cariani - IronCast</li>
        <li>Flow Games</li>
        <li>PrimoCast</li>
        <li>Os Sócios Podcast</li>
        <li>Ciência Sem Fim</li>
      </ul>
      <p className="my-6">
        Novos podcasts podem ser adicionados, então fique atento às
        atualizações.
      </p>

      <h1 className="my-6 text-3xl font-bold">
        Guia de Pesquisa por Palavras-Chave
      </h1>

      <p className="my-6">
        Após fazer o login, um usuário com seu plano de assinatura ativo na
        plataforma pode acessar a página de pesquisa. Antes de pesquisar, com a
        palavra-chave já sendo preenchida ou já preenchida no sistema, o
        aplicativo oferece sugestões automáticas de resultados, assim como no
        Bing e Google.
      </p>

      <p className="my-6">
        Após a busca ser finalizada, a tela exibe os vídeos que possuem trechos
        que citam a palavra-chave, permitindo ao usuário ir diretamente ao
        momento em que a palavra-chave pesquisada está sendo citada.
      </p>

      <h2 className="my-6 text-2xl font-bold">
        Use Palavras Simples e Relevantes
      </h2>
      <p className="my-6">
        Utilize palavras-chave curtas e diretas. Evite termos longos ou
        complexos. Por exemplo, prefira {'"james web"'} ao invés de{" "}
        {'"telescópio james webb"'}.
      </p>

      <h2 className="my-6 text-2xl font-bold">Evite Palavras Auxiliares</h2>
      <p className="my-6">
        Foque nas palavras principais e remova palavras auxiliares que não
        agregam valor à sua busca. Por exemplo, use {'"política inclusão"'} ao
        invés de {'"políticas de inclusão"'}.
      </p>

      <h2 className="my-6 text-2xl font-bold">Prefira o Singular</h2>
      <p className="my-6">
        Sempre que possível, utilize palavras no singular, especialmente se a
        versão plural for apenas um {'"s"'} adicional. Exemplo: {'"empresa"'} ao
        invés de {'"empresas"'}.
      </p>

      <h2 className="my-6 text-2xl font-bold">
        Escolha Termos Comuns e Conhecidos
      </h2>
      <p className="my-6">
        Use palavras que sejam de fácil compreensão e de uso comum para aumentar
        a relevância dos resultados. Por exemplo, {'"oscar"'} ao invés de{" "}
        {'"grammy"'}.
      </p>

      <h2 className="my-6 text-2xl font-bold">Simplifique Termos Técnicos</h2>
      <p className="my-6">
        Torne termos técnicos mais acessíveis. Exemplo: {'"maior salario"'} ao
        invés de {'"salarios mais altos"'}.
      </p>

      <h2 className="my-6 text-2xl font-bold">Uniformidade na Escrita</h2>
      <p className="my-6">
        Digite todas as palavras-chave em letras minúsculas. Isso ajuda a manter
        a consistência e evita problemas de diferenciação entre maiúsculas e
        minúsculas.
      </p>

      <h2 className="my-6 text-2xl font-bold">
        Adapte-se ao Algoritmo de Transcrição
      </h2>
      <p className="my-6">
        Entenda que o algoritmo de transcrição pode separar palavras longas.
        Simplifique suas palavras-chave para aumentar as chances de encontrar os
        resultados desejados. Por exemplo, {'"cyber truck"'} ao invés de
        {'"cybertruck"'}.
      </p>

      <h2 className="my-6 text-2xl font-bold">Utilize o Stemming</h2>
      <p className="my-6">
        Um stemmer em português é uma ferramenta ou algoritmo que reduz as
        palavras ao seu radical ou raiz. A ideia principal é transformar
        diferentes formas de uma palavra em uma forma base ou raiz, eliminando
        sufixos, prefixos e outros morfemas que não são essenciais para o
        significado básico da palavra. Isso é especialmente útil em tarefas de
        processamento de linguagem natural (NLP), como a indexação de
        documentos, busca e recuperação de informações, e análise de texto.
      </p>

      <p className="my-6">
        <b>Exemplos de Stemming em Português:</b>
      </p>
      <ul className="my-6 list-inside list-disc">
        <li>
          <b>Palavra original:</b> {"correndo"} <b>Raiz (stem):</b> {"corr"}
        </li>
        <li>
          <b>Palavra original:</b> {"correr"} <b>Raiz (stem):</b> {"corr"}
        </li>
        <li>
          <b>Palavra original:</b> {"corrida"} <b>Raiz (stem):</b> {"corr"}
        </li>
        <li>
          <b>Palavra original:</b> {"corredores"} <b>Raiz (stem):</b> {"corr"}
        </li>
      </ul>

      <p className="my-6">
        <b>Importância do Stemming:</b>
      </p>
      <ul className="my-6 list-inside list-disc">
        <li>
          <b>Melhora a busca e recuperação de informações:</b> Ao reduzir as
          palavras à sua forma base, um sistema de busca pode encontrar todas as
          variantes de uma palavra, aumentando a relevância dos resultados.
        </li>
        <li>
          <b>Reduz a dimensionalidade dos dados:</b> Em análise de texto, ter
          menos variantes de uma palavra diminui o número total de palavras
          únicas (ou tokens), facilitando a análise e processamento.
        </li>
        <li>
          <b>Consistência na análise:</b> Facilita a comparação de textos e a
          identificação de temas e tópicos, pois diferentes formas de uma
          palavra são tratadas como a mesma unidade.
        </li>
      </ul>

      <p className="mt-8">
        Para maiores dúvidas ou contato, envie um e-mail para{" "}
        <a href="mailto:contato@searchcast.app" className="text-blue-500">
          contato@searchcast.app
        </a>
        .
      </p>
    </div>
  );
}
