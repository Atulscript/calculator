export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
  reviewedBy?: string;
  lastUpdated?: string;
}

export interface ArticleStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ArticleVariable {
  symbol: string;
  meaning: string;
}

export interface ArticleFormulaCard {
  title: string;
  formula: string;
  explanation: string;
  variables?: ArticleVariable[];
}

export interface ArticleWorkedExample {
  title: string;
  scenario: string;
  inputs: { label: string; value: string }[];
  steps: string[];
  result: string;
  takeaway?: string;
}

export interface ArticleSectionItem {
  id: string;
  title: string;
  paragraphs: string[];
  callout?: {
    type: 'info' | 'tip' | 'warning' | 'formula';
    title: string;
    text: string;
  };
  bullets?: string[];
}

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

export interface ArticleReference {
  title: string;
  source: string;
  url?: string;
}

export interface CalculatorArticle {
  calculatorId: string;
  title: string;
  subtitle: string;
  readTimeMinutes?: number;
  author?: ArticleAuthor;
  overview: string[];
  formulaCard?: ArticleFormulaCard;
  howToSteps?: {
    title: string;
    steps: ArticleStep[];
  };
  workedExample?: ArticleWorkedExample;
  sections?: ArticleSectionItem[];
  faqs: ArticleFaqItem[];
  references?: ArticleReference[];
}
