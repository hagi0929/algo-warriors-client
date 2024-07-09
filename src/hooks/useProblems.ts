import { useQuery } from '@tanstack/react-query';
import { fetchProblems } from '../api/problemsApi';
import { Problem } from '../models/Problem';

export const useProblems = () => {
  return useQuery<Problem[], Error>({
    queryKey: ['problems'],
    queryFn: fetchProblems,
  });

};
