export interface Problem {
  id: number;
  description: string;
  status: string;
  date: string;
  value: string;
  title: string;
}

export interface ProblemMinimal {
  id: number;
  title: string;
}


export interface AbstractProblem {
  problem_id: number;
  title: string;
  categories: number[];
  difficulty: number;
}

export interface ProblemFilterOptions {
  title: string | null;
  difficulty: string[] | null;
  categories: string[] | null;
  contest_id: number | null;
  sort_by: string | null;
}

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}