import { useQuery } from '@tanstack/react-query';
import { fetchProblems,fetchProblemDescription } from '../api/problemsApi';
import { Problem } from '../models/Problem';

export const useProblems = () => {
  return useQuery<Problem[], Error>({
    queryKey: ['problems'],
    queryFn: fetchProblems,
  });

};

export const useProblemDescription = (id:string) => {
  return useQuery<Problem[], Error>({
    queryKey: ['problem_description'],
    queryFn: () => fetchProblemDescription(id),
  });
};