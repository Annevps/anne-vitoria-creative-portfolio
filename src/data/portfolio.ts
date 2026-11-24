import annePortrait from "@/assets/anne-portrait.png";
import projectDashboard from "@/assets/project-dashboard.png";
import projectEcommerce from "@/assets/project-ecommerce.png";
import projectTechEmpire from "@/assets/project-techempire.png";

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

export const HERO_METRICS = [
  { value: 15, suffix: "+", label: "projetos entregues" },
  { value: 100, suffix: "%", label: "responsivo e otimizado" },
  { value: 24, suffix: "h", label: "retorno médio no contato" },
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
  category: "Sistemas Web" | "E-commerce" | "Sites Institucionais";
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

export const PROJECTS: ProjectItem[] = [
  {
    id: "dashboard-administrativo",
    title: "Dashboard Administrativo",
    category: "Sistemas Web",
    year: "2026",
    featured: true,
    image: projectDashboard,
    summary:
      "Sistema web completo para gestão de indicadores em tempo real, relatórios automatizados e controle granular de permissões.",
    clientOutcome:
      "Centraliza vendas, clientes e métricas financeiras em uma única tela rápida, eliminando planilhas espalhadas.",
    challenge:
      "Equipes perdiam horas consolidando dados de vendas e pedidos manualmente antes de tomar decisões.",
    solution:
      "Interface reativa em React com gráficos dinâmicos, filtros por período, API REST em Node.js e consultas otimizadas em MySQL.",
    stack: ["React", "TypeScript", "Node.js", "MySQL", "Tailwind CSS"],
    highlights: [
      "Indicadores financeiros em tempo real",
      "Perfis de acesso por nível de usuário",
      "Exportação rápida de relatórios",
    ],
    repoUrl: "https://github.com/Annevps",
  },
  {
    id: "plataforma-ecommerce",
    title: "Plataforma de E-commerce",
    category: "E-commerce",
    year: "2026",
    featured: true,
    image: projectEcommerce,
    summary:
      "Loja virtual sofisticada otimizada para conversão, com filtros inteligentes, carrinho lateral fluido e checkout simplificado.",
    clientOutcome:
      "Aumenta a confiança na compra pelo celular e reduz o abandono de carrinho com navegação instantânea.",
    challenge:
      "Lojas genéricas carregavam devagar no mobile e não valorizavam produtos de ticket mais alto.",
    solution:
      "Vitrine responsiva com busca sem recarregamento, controle de estoque integrado via API REST e foco total em performance.",
    stack: ["TypeScript", "React", "CSS3", "API REST", "UI/UX"],
    highlights: [
      "Carrinho lateral sem trocar de página",
      "Filtros por categoria e faixa de preço",
      "SEO estruturado por produto",
    ],
    repoUrl: "https://github.com/Annevps",
  },
  {
    id: "tech-empire",
    title: "Tech Empire",
    category: "Sites Institucionais",
    year: "2026",
    featured: true,
    image: projectTechEmpire,
    summary:
      "Portal corporativo de tecnologia com identidade visual marcante, apresentação de serviços, métricas de impacto e foco em captação de clientes.",
    clientOutcome:
      "Posiciona a marca com autoridade imediata, apresentando serviços e diferenciais com clareza em poucos segundos.",
    challenge:
      "Comunicar soluções tecnológicas complexas de forma direta, visualmente impactante e acessível em qualquer tela.",
    solution:
      "Arquitetura limpa com hierarquia tipográfica editorial, microinterações suaves e otimização completa para mecanismos de busca.",
    stack: ["HTML5", "CSS3", "JavaScript", "SEO Técnico", "Design Responsivo"],
    highlights: [
      "Identidade visual autoral em modo escuro",
      "Estrutura otimizada para Google",
      "Navegação fluida em desktop e celular",
    ],
    liveUrl: "https://github.com/Annevps/minhapagina",
    repoUrl: "https://github.com/Annevps",
  },
];

export interface SkillGroup {
  id: "frontend" | "backend" | "database" | "ux-seo";
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
];

export const WORK_PILLARS = [
  {
    title: "Você fala direto com quem programa",
    description:
      "Do primeiro alinhamento à publicação final, você conversa diretamente comigo — sem intermediários distorcendo o seu pedido.",
  },
  {
    title: "Código limpo e propriedade sua",
    description:
      "Domínio, hospedagem e código organizado ficam no seu nome. Nada de soluções presas a plataformas engessadas.",
  },
  {
    title: "Pensado para o Google e para o celular",
    description:
      "Estrutura semântica, carregamento leve e layout adaptado para telas pequenas, onde está a maior parte dos seus clientes.",
  },
  {
    title: "Acompanhamento após o lançamento",
    description:
      "Atendimento remoto para todo o Brasil com suporte próximo para evoluir o projeto conforme o seu negócio cresce.",
  },
] as const;

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