import annePortrait from "@/assets/anne-portrait.png";

export const PROFILE = {
  name: "Anne Vitória",
  fullName: "Anne Vitória Pereira da Silva",
  monogram: "{AV}",
  role: "Desenvolvedora Full Stack",
  location: "Atendimento remoto · Brasil inteiro",
  whatsappDisplay: "(33) 99841-4684",
  whatsappDigits: "5533998414684",
  email: "annevitoriaps10@gmail.com",
  githubUrl: "https://github.com/Annevps",
  portrait: annePortrait,
} as const;

export function whatsappHref(message?: string): string {
  const text =
    message ??
    "Olá Anne! Vi seu portfólio e gostaria de conversar sobre um projeto sob medida.";
  return `https://wa.me/${PROFILE.whatsappDigits}?text=${encodeURIComponent(text)}`;
}

export const HERO_HIGHLIGHTS = [
  { value: "100%", label: "responsivo em celular e desktop" },
  { value: "Full Stack", label: "do banco de dados à interface" },
  { value: "Remoto", label: "atendimento para todo o Brasil" },
] as const;

export const TECH_MARQUEE = [
  "TypeScript",
  "React",
  "Node.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Python",
  "MySQL",
  "PostgreSQL",
  "APIs REST",
  "UI/UX Design",
  "SEO Técnico",
  "Git & GitHub",
  "Framer Motion",
] as const;

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  audience: string;
  tags: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Sites profissionais de alta conversão",
    description:
      "Páginas rápidas, com design sob medida, SEO técnico estruturado para o Google e botão direto para o WhatsApp. Feito para transformar visitantes em clientes.",
    audience: "Para empresas, profissionais liberais e marcas pessoais",
    tags: ["React", "SEO", "Alta Velocidade"],
  },
  {
    number: "02",
    title: "Sistemas web e dashboards sob medida",
    description:
      "Painéis administrativos, controle de estoque, agenda, clientes e relatórios em tempo real. Sua operação sai da planilha e ganha escala com segurança.",
    audience: "Para comércios, escritórios e equipes em crescimento",
    tags: ["Full Stack", "Node.js", "MySQL"],
  },
  {
    number: "03",
    title: "Lojas virtuais e catálogos interativos",
    description:
      "Experiência de compra fluida no celular e no computador, filtros rápidos, carrinho intuitivo e integração direta com meios de pagamento ou WhatsApp.",
    audience: "Para varejo, marcas autorais e vendas online",
    tags: ["E-commerce", "UI/UX", "Conversão"],
  },
  {
    number: "04",
    title: "APIs, integrações e automações",
    description:
      "Conexão entre sistemas, automação de rotinas repetitivas e back-end estruturado em Node.js ou Python para manter seus dados sincronizados.",
    audience: "Para operações que precisam ganhar tempo e reduzir erros",
    tags: ["Node.js", "Python", "REST API"],
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  featured: boolean;
  image: string;
  summary: string;
  clientOutcome: string;
  challenge: string;
  solution: string;
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface ArticleItem {
  number: string;
  category: string;
  title: string;
  excerpt: string;
  fullText: string;
  image: string;
  imageAlt: string;
  wide?: boolean;
}

export const ARTICLES: ArticleItem[] = [
  {
    number: "01",
    category: "Inteligência Artificial",
    title: "Inteligência artificial no dia a dia das pessoas",
    excerpt:
      "A inteligência artificial já faz parte dos estudos, do trabalho e de tarefas cotidianas, ajudando a organizar informações e encontrar novas possibilidades.",
    fullText:
      "A inteligência artificial está cada vez mais presente em atividades que fazem parte da nossa rotina. Ela pode ajudar nos estudos, organizar informações, responder perguntas e facilitar tarefas de trabalho. Além disso, ferramentas inteligentes estão sendo utilizadas em diferentes áreas, tornando alguns processos mais rápidos e acessíveis. Entender como essa tecnologia funciona é importante para utilizá-la com responsabilidade, criatividade e senso crítico, aproveitando seus recursos sem deixar de desenvolver nosso próprio conhecimento.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Representação visual de inteligência artificial em uma interface digital",
  },
  {
    number: "02",
    category: "Segurança Digital",
    title: "Segurança digital e golpes pelo WhatsApp",
    excerpt:
      "Proteger dados e reconhecer mensagens suspeitas são atitudes essenciais para usar aplicativos de conversa com mais tranquilidade.",
    fullText:
      "Com o aumento do uso da internet, proteger informações pessoais se tornou uma necessidade. Golpes digitais podem chegar por mensagens, links suspeitos e perfis falsos, inclusive em aplicativos de conversa. Por isso, é importante conferir a identidade de quem envia uma mensagem, evitar compartilhar códigos de acesso e utilizar senhas diferentes e seguras. Ativar a verificação em duas etapas também ajuda a preservar nossa privacidade e torna o uso da tecnologia mais seguro.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Pessoa utilizando um celular e recursos de pagamento digital",
  },
  {
    number: "03",
    category: "Mercado de Trabalho",
    title: "Carreiras de tecnologia que estão crescendo",
    excerpt:
      "Desenvolvimento de software, dados e segurança digital são algumas das áreas que oferecem caminhos para quem gosta de resolver problemas.",
    fullText:
      "A área de tecnologia oferece diferentes caminhos para quem gosta de aprender, resolver problemas e criar soluções. Desenvolvimento de software, análise de dados, segurança digital e inteligência artificial são exemplos de campos que despertam interesse. Para acompanhar essas mudanças, é importante desenvolver conhecimentos técnicos, praticar a programação e aprender a trabalhar em equipe. Curiosidade, dedicação e disposição para aprender fazem parte da construção de uma trajetória profissional nessa área.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Computador com editor de código em uma estação de trabalho",
  },
  {
    number: "04",
    category: "Desenvolvimento Regional",
    title: "Tecnologia no campo e no agronegócio do Vale do Mucuri",
    excerpt:
      "Ferramentas digitais podem apoiar produtores, melhorar o acompanhamento das atividades rurais e contribuir para o desenvolvimento regional.",
    fullText:
      "A tecnologia também tem um papel importante no desenvolvimento das regiões rurais. No Vale do Mucuri, soluções digitais podem contribuir para melhorar atividades do campo, facilitar o acompanhamento das plantações e apoiar decisões dos produtores. Sensores, sistemas de monitoramento, aplicativos e ferramentas de gestão são exemplos de recursos que podem tornar o trabalho mais organizado e eficiente. A inovação também pode gerar oportunidades, conhecimento e desenvolvimento para a nossa região.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Paisagem de área agrícola ao entardecer",
    wide: true,
  },
  {
    number: "05",
    category: "Tecnologia Sustentável",
    title: "Sustentabilidade e lixo eletrônico",
    excerpt:
      "O descarte correto, a reciclagem e a manutenção dos equipamentos ajudam a reduzir impactos ambientais causados pelo lixo eletrônico.",
    fullText:
      "O avanço da tecnologia também traz uma responsabilidade: pensar no destino dos equipamentos que deixam de ser utilizados. Celulares, computadores, baterias e outros componentes não devem ser descartados junto ao lixo comum. O descarte em pontos de coleta apropriados permite que parte desses materiais seja encaminhada para reciclagem. Cuidar dos equipamentos, realizar manutenção e prolongar sua vida útil são atitudes que ajudam a construir uma relação mais consciente e sustentável com a tecnologia.",
    image:
      "https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Equipamentos eletrônicos e componentes destinados à reciclagem",
    wide: true,
  },
];

export const PROGRAMMER_REFERENCES = [
  {
    name: "Linus Torvalds",
    country: "Finlândia",
    specialty: "Sistemas e código aberto",
    contribution:
      "Criou o Linux e o Git, duas tecnologias que transformaram a forma de desenvolver, versionar e compartilhar software no mundo inteiro.",
    lesson: "Construir fundamentos sólidos e colaborar com a comunidade.",
    image: "https://github.com/torvalds.png",
    profileUrl: "https://github.com/torvalds",
  },
  {
    name: "Evan You",
    country: "China",
    specialty: "Interfaces e ferramentas web",
    contribution:
      "Criou o Vue.js e o Vite, ferramentas que tornam o desenvolvimento de interfaces e aplicações web mais produtivo e acessível.",
    lesson: "Simplificar processos também é uma forma de inovar.",
    image: "https://github.com/yyx990803.png",
    profileUrl: "https://github.com/yyx990803",
  },
  {
    name: "José Valim",
    country: "Brasil",
    specialty: "Linguagens e sistemas escaláveis",
    contribution:
      "Criou a linguagem Elixir, usada em aplicações que precisam lidar com muitas operações simultâneas e alta disponibilidade.",
    lesson: "Conhecimento e dedicação podem gerar tecnologia de alcance global.",
    image: "https://github.com/josevalim.png",
    profileUrl: "https://github.com/josevalim",
  },
] as const;

export interface SkillGroup {
  id: "frontend" | "backend" | "database" | "ux-seo" | "tools";
  label: string;
  headline: string;
  description: string;
  skills: { name: string; level: number; detail: string }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    label: "Front-end & Interfaces",
    headline: "Interfaces rápidas, responsivas e memoráveis",
    description:
      "Construo telas que funcionam com fluidez do celular ao monitor widescreen, com animações suaves e foco absoluto na clareza.",
    skills: [
      { name: "React & TypeScript", level: 92, detail: "Componentes reutilizáveis, tipagem segura e estados previsíveis" },
      { name: "HTML5 & CSS3 Moderno", level: 96, detail: "Semântica limpa, Grid, Flexbox e animações fluidas" },
      { name: "Tailwind CSS", level: 94, detail: "Design systems consistentes com tokens semânticos" },
      { name: "JavaScript (ES2024+)", level: 93, detail: "Interatividade rica, APIs do navegador e código limpo" },
    ],
  },
  {
    id: "backend",
    label: "Back-end & APIs",
    headline: "Regras de negócio sólidas e integrações seguras",
    description:
      "Desenvolvo a camada de servidor que sustenta o sistema com autenticação, validação de dados e rotas rápidas.",
    skills: [
      { name: "Node.js", level: 88, detail: "APIs REST escaláveis, serviços web e automações" },
      { name: "Python", level: 85, detail: "Scripts, automação de tarefas e back-end estruturado" },
      { name: "APIs REST & Integrações", level: 90, detail: "Webhooks, gateways de pagamento e consumo de serviços" },
      { name: "Git & GitHub", level: 92, detail: "Versionamento organizado e entregas contínuas" },
    ],
  },
  {
    id: "database",
    label: "Banco de Dados",
    headline: "Dados modelados para crescer sem lentidão",
    description:
      "Estruturo tabelas, relacionamentos e consultas para manter informações íntegras, seguras e rápidas de consultar.",
    skills: [
      { name: "MySQL", level: 90, detail: "Modelagem relacional, índices e queries otimizadas" },
      { name: "PostgreSQL", level: 84, detail: "Segurança por linha, integridade e alta confiabilidade" },
      { name: "Arquitetura de Dados", level: 86, detail: "Normalização, backups e separação de responsabilidades" },
    ],
  },
  {
    id: "ux-seo",
    label: "UI/UX, SEO & Performance",
    headline: "Beleza com propósito e visibilidade no Google",
    description:
      "Um site profissional precisa encantar no primeiro olhar, carregar rápido no 4G e ser encontrado por quem procura seu serviço.",
    skills: [
      { name: "UI/UX & Design Responsivo", level: 94, detail: "Hierarquia visual, contraste e experiência mobile-first" },
      { name: "SEO Técnico & Semântica", level: 91, detail: "Metatags, Open Graph, dados estruturados e headings limpos" },
      { name: "Performance Web", level: 90, detail: "Carregamento ágil, imagens otimizadas e código enxuto" },
    ],
  },
  {
    id: "tools",
    label: "Ferramentas & Pessoas",
    headline: "Organização, comunicação e suporte ao trabalho",
    description:
      "Tecnologia também envolve ouvir com atenção, organizar informações e dominar ferramentas que apoiam uma rotina produtiva.",
    skills: [
      { name: "Excel", level: 86, detail: "Organização de dados, planilhas e acompanhamento de informações" },
      { name: "Comunicação ativa", level: 94, detail: "Escuta atenta, troca clara de ideias e entendimento das necessidades" },
      { name: "Word & Documentação", level: 88, detail: "Produção e organização de documentos, textos e materiais de apoio" },
      { name: "Hardware & Software", level: 84, detail: "Noções de instalação, configuração, manutenção e uso de recursos computacionais" },
    ],
  },
];

export const FAQS = [
  {
    q: "Como funciona o atendimento à distância?",
    a: "Atendo clientes de todo o Brasil de forma 100% remota, com reuniões rápidas por vídeo ou WhatsApp e entregas parciais para você acompanhar cada etapa funcionando.",
  },
  {
    q: "Quanto tempo leva para desenvolver um site ou sistema?",
    a: "Sites institucionais e landing pages costumam levar de 1 a 3 semanas. Sistemas sob medida variam conforme o escopo, sempre com cronograma claro combinado antes de começar.",
  },
  {
    q: "O site já vem pronto para aparecer no Google e funcionar no celular?",
    a: "Sim. Todos os projetos são construídos com design responsivo mobile-first, carregamento rápido, metatags de SEO e estrutura semântica otimizada.",
  },
  {
    q: "Como faço para pedir um orçamento?",
    a: "Basta clicar no botão de WhatsApp ou enviar uma mensagem na página de Contato contando rapidamente sua ideia. Retorno em até 24 horas com os próximos passos.",
  },
] as const;

export const CODE_SNIPPETS = [
  {
    id: "typescript",
    label: "TypeScript",
    filename: "search.ts",
    code: `const diacritics = new RegExp("[\\\\u0300-\\\\u036f]", "g");

export const normalize = (value: string) =>
  value.normalize("NFD").replace(diacritics, "").toLowerCase();

// Busca inteligente: "ecommerce" encontra "E-commerce" sem travar a interface`,
  },
  {
    id: "react",
    label: "React",
    filename: "BrandMark.tsx",
    code: `export function BrandMark() {
  return (
    <span className="inline-flex items-baseline gap-1 font-display font-bold text-primary">
      {"{"}
      <span className="tracking-tight text-foreground">AV</span>
      {"}"}
    </span>
  );
}`,
  },
  {
    id: "css",
    label: "CSS",
    filename: "tokens.css",
    code: `:root {
  --background: oklch(0.142 0.012 252);
  --primary: oklch(0.865 0.095 88);
  --accent: oklch(0.735 0.175 152);
}

/* Tokens semânticos em OKLCH — contraste consistente em todas as telas */`,
  },
] as const;