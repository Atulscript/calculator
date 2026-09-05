export type CalculatorCategory =
  | 'all'
  | 'everyday'
  | 'health'
  | 'finance'
  | 'math'
  | 'conversion'
  | 'science'
  | 'food'
  | 'construction';

export interface CategoryInfo {
  id: CalculatorCategory;
  name: string;
  description: string;
  icon: string;
  count?: number;
}

export interface CalculatorMeta {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: CalculatorCategory;
  tags: string[];
  icon: string;
  badge?: string;
}
