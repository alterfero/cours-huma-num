const provenance = '/assets/chapitre9-provenance.json';

export const chapter9Sources = [
  { id: 'p9-llm', org: 'Brown et al., 2020', title: 'Language Models are Few-Shot Learners', url: 'https://arxiv.org/abs/2005.14165', note: 'Apprentissage d’un modèle de langage et effet des exemples fournis avec la consigne.' },
  { id: 'p9-raisonnement', org: 'Wei et al., 2022', title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', url: 'https://arxiv.org/abs/2201.11903', note: 'Expériences sur la résolution de problèmes qui demandent plusieurs étapes.' },
  { id: 'p9-agent', org: 'Anthropic, 2025', title: 'How we built our multi-agent research system', url: 'https://www.anthropic.com/engineering/multi-agent-research-system', note: 'Répartition du travail entre un agent coordinateur et des sous-agents.' },
  { id: 'p9-rag', org: 'Lewis et al., 2020', title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: 'https://arxiv.org/abs/2005.11401', note: 'Recherche de passages documentaires pour alimenter la génération d’une réponse.' },
  { id: 'p9-dig4el', org: 'Sébastien Christian, 2025', title: 'Enhancing grammatical documentation for endangered languages with graph-based meaning representation and Loopy Belief Propagation', url: 'https://doi.org/10.1016/j.nlp.2025.100164', note: 'Description de la méthode DIG4EL et de la rédaction à partir de données linguistiques et d’exemples attestés.' }
];

function citation(id) {
  const source = chapter9Sources.find(source => source.id === id);
  return `<a href="${source.url}">${source.org}</a>`;
}

export function chapterNine() {
  return `<article class="course-article short-chapter" data-content-origin="ai-assisted" data-provenance="${provenance}">
    <header class="chapter-hero">
      <span class="eyebrow">Chapitre 09 / Intelligence artificielle</span>
      <h1>LLM et agents IA</h1>
      <p class="lead">Un modèle de langage peut raisonner sur les informations qu’on lui fournit. En l’équipant d’outils, on peut aussi lui faire coordonner d’autres modèles ou interroger une collection de documents.</p>
      <p class="small">Texte pédagogique rédigé avec l’aide d’une IA. <a href="${provenance}">Métadonnées de rédaction</a>.</p>
    </header>
    <nav class="on-this-page" aria-label="Dans ce chapitre"><span>Les repères</span>
      <a href="#c9-llm" data-scroll="c9-llm">Les LLM</a>
      <a href="#c9-agent" data-scroll="c9-agent">Les agents</a>
      <a href="#c9-rag" data-scroll="c9-rag">Recherche documentaire et RAG</a>
    </nav>

    <section class="lesson-section" id="c9-llm">
      <div class="section-kicker">01 / Les LLM</div>
      <h2>Connaissance paramétrique et raisonnement</h2>
      <p>Un <strong>grand modèle de langage</strong> (LLM, <i lang="en">large language model</i>) apprend à prédire le prochain fragment de texte, appelé <em>token</em>. Pendant l’entraînement, il ajuste des valeurs numériques, ses <strong>paramètres</strong>. Les régularités apprises de cette façon lui permettent de conjuguer un verbe, de reconnaître les sens d’un mot ou de restituer certains faits. On parle de <strong>connaissance paramétrique</strong> parce que ces connaissances sont réparties dans les paramètres. Elles peuvent être mobilisées sans ouvrir de document, mais leur source précise est alors difficile à retrouver.</p>
      <p>Au moment de répondre, le modèle dispose aussi d’un <strong>contexte</strong> : la consigne, les échanges précédents et les textes qu’on lui fournit. Il peut raisonner sur des informations qu’il découvre à cet instant. Si la consigne dit que le texte A est antérieur au texte B et que B est antérieur à C, il peut déduire que A est antérieur à C. Cette conclusion vient des relations données dans la consigne. Pour la vérifier, on peut reprendre chacune des deux prémisses. Une erreur dans l’une d’elles suffit à fragiliser la conclusion. ${citation('p9-llm')} · ${citation('p9-raisonnement')}.</p>
    </section>

    <section class="lesson-section" id="c9-agent">
      <div class="section-kicker">02 / Les agents</div>
      <h2>Des LLM qui coordonnent d’autres LLM</h2>
      <p>Un <strong>agent</strong> associe un modèle de langage à un objectif et à des outils. Le modèle choisit une action, le logiciel l’exécute, puis le modèle en observe le résultat pour décider de la suite. Un seul agent peut ainsi mener une tâche en plusieurs étapes. Il peut aussi déléguer une partie du travail à d’autres agents, chacun piloté par un LLM.</p>
      <p>Dans un <strong>système multi-agents</strong>, un LLM coordonne le travail des autres agents. Pour préparer une synthèse, il peut charger un premier agent de relever les thèses de plusieurs textes et un deuxième de chercher les passages qui les contredisent. Chacun reçoit une consigne et renvoie ses résultats avec ses références. Le coordinateur compare les passages, demande au besoin une nouvelle lecture, puis rédige la synthèse. Les rôles peuvent être confiés à plusieurs instances du même modèle. Si deux agents citent le même passage, leur accord repose toujours sur une seule source. ${citation('p9-agent')}.</p>
    </section>

    <section class="lesson-section" id="c9-rag">
      <div class="section-kicker">03 / Les bases documentaires</div>
      <h2>Rechercher dans une base documentaire avec un LLM</h2>
      <p>Le <strong>RAG</strong> (<i lang="en">retrieval-augmented generation</i>, ou génération augmentée par la recherche documentaire) relie deux opérations : retrouver des documents pertinents et rédiger une réponse à partir de leur contenu. La base peut contenir des notices, des transcriptions ou des phrases annotées.</p>
      <ol>
        <li><strong>Retrouver.</strong> À partir de la question, un moteur sélectionne des passages par mots-clés, par annotations ou par proximité de sens. Il conserve le lien de chaque passage avec le document d’origine.</li>
        <li><strong>Rédiger.</strong> Le système transmet au LLM la question et les passages retenus. Ceux-ci entrent dans son contexte pour cette réponse, sans modifier ses paramètres.</li>
        <li><strong>Vérifier.</strong> Le lecteur peut rouvrir les sources citées et examiner si elles étayent la réponse. Un passage pertinent peut avoir échappé à la recherche, et le modèle peut généraliser au-delà de ce que montrent les extraits. ${citation('p9-rag')}.</li>
      </ol>
      <h3>Comment DIG4EL choisit des exemples de grammaire</h3>
      <p><strong>DIG4EL</strong> applique ce principe pour préparer une leçon de grammaire. Lorsqu’on choisit un point à expliquer, le système recherche dans le corpus de la langue les exemples qui l’éclairent et les fournit au LLM pour rédiger la leçon. Pour étudier l’ordre du sujet, du verbe et de l’objet, on cherchera par exemple des énoncés où les trois sont exprimés et identifiables. Une phrase sans objet peut être bien traduite tout en étant peu utile pour cette question.</p>
      <p>La personne qui prépare la leçon peut alors revenir aux énoncés retenus, examiner la traduction et les annotations disponibles, puis juger si l’explication rend compte des usages observés. ${citation('p9-dig4el')} · <a href="https://github.com/alterfero/dig4el#main-workflow">Documentation de DIG4EL</a>.</p>
    </section>
  </article>`;
}
