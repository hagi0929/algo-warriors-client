import { useQuery } from '@tanstack/react-query';
import { fetchDashboardProblems, fetchProblemDescription } from '../api/problemsApi';
import { AbstractProblem, Problem, ProblemFilterOptions } from '../models/Problem';
import { PagenationState } from '../models/Etc';

export const useProblems = (filters: ProblemFilterOptions | null, Pagenation: PagenationState | null) => {
  if (!filters) {
    return useQuery<AbstractProblem[], Error>({
      queryKey: ['problems', filters, Pagenation],
      queryFn: () => fetchDashboardProblems(null, Pagenation),
    });
    }
  return useQuery<AbstractProblem[], Error>({
    queryKey: ['problems', filters, Pagenation],
    queryFn: () => fetchDashboardProblems(filters, Pagenation),
  });
};

export const useProblemDescription = (id:string) => {
  return useQuery<Problem[], Error>({
    queryKey: ['problem', id],
    queryFn: () => fetchProblemDescription(id),
  });
};