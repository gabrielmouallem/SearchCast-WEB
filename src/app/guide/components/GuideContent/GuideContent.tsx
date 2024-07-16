export function GuideContent() {
  return (
    <div className="mx-auto mt-14 max-w-screen-md p-10">
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

      <h2 className="my-6 text-2xl font-bold">
        Exemplos de Palavras-Chave Eficientes
      </h2>

      <h3 className="mb-2 text-xl font-bold">Tecnologia e Inovação</h3>
      <ul className="my-6 list-inside list-disc">
        <li>chat gpt</li>
        <li>inteligência artificial</li>
        <li>elon musk</li>
        <li>cyber truck</li>
        <li>5g brasil</li>
        <li>criptomoeda</li>
        <li>startup brasileira</li>
        <li>privacidade dado</li>
      </ul>

      <h3 className="mb-2 text-xl font-bold">Saúde e Bem-Estar</h3>
      <ul className="my-6 list-inside list-disc">
        <li>meditação</li>
        <li>saúde mental</li>
        <li>ansiedade</li>
        <li>depressão</li>
        <li>terapia alternativa</li>
        <li>terapia online</li>
        <li>burnout</li>
        <li>dengue</li>
      </ul>

      <h3 className="mb-2 text-xl font-bold">Cultura, Política e Sociedade</h3>
      <ul className="my-6 list-inside list-disc">
        <li>eleições municipais</li>
        <li>anitta</li>
        <li>privatiza praia</li>
        <li>reforma tributária</li>
        <li>marco temporal</li>
        <li>congresso nacional</li>
        <li>endrick</li>
        <li>política inclusão</li>
        <li>meio ambiente</li>
      </ul>

      <h3 className="mb-2 text-xl font-bold">Esportes e Entretenimento</h3>
      <ul className="my-6 list-inside list-disc">
        <li>gta 6</li>
        <li>copa feminina</li>
        <li>flamengo</li>
        <li>palmeiras</li>
        <li>neymar</li>
        <li>melhor série</li>
        <li>olimpíadas paris</li>
        <li>oscar</li>
      </ul>

      <h3 className="mb-2 text-xl font-bold">Ciência e Espaço</h3>
      <ul className="my-6 list-inside list-disc">
        <li>spacex</li>
        <li>missão artemis</li>
        <li>james web</li>
        <li>explora marte</li>
        <li>buraco negro</li>
        <li>amazônia</li>
        <li>mudança climática</li>
        <li>astrobiologia</li>
      </ul>

      <h3 className="mb-2 text-xl font-bold">Economia e Negócios</h3>
      <ul className="my-6 list-inside list-disc">
        <li>empreendedorismo</li>
        <li>vaga tecnologia</li>
        <li>maior salario</li>
        <li>mercado imobiliário</li>
        <li>inflação brasil</li>
        <li>taxa selic</li>
        <li>ensino híbrido</li>
        <li>intercâmbio</li>
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
