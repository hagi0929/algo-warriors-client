import { useQuery } from '@tanstack/react-query';
import { fetchProblems } from '../api/problemsApi';
import { AbstractProblem, ProblemFilterOptions } from '../models/Problem';
import { PagenationState } from '../models/Etc';

export const useProblems = (filters: ProblemFilterOptions | null, Pagenation: PagenationState | null) => {
  if (!filters) {
    return useQuery<AbstractProblem[], Error>({
      queryKey: ['problems', filters, Pagenation],
      queryFn: () => fetchProblems(null, Pagenation),
    });
    }
  return useQuery<AbstractProblem[], Error>({
    queryKey: ['problems', filters, Pagenation],
    queryFn: () => fetchProblems(filters, Pagenation),
  });
};
