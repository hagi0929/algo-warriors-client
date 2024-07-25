import { useQuery } from '@tanstack/react-query';
import { fetchRecommendedProblems } from '../api/recommendationApi';
import { Problem } from '../models/Problem';

export const useRecommendedProblems = (id:number) => {
  return useQuery<Problem[], Error>({
    queryKey: ['recommended_problems'],
    queryFn: () => fetchRecommendedProblems(id),
  });
};