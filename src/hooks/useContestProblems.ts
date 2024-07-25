import { useQuery } from '@tanstack/react-query';
import { fetchContestProblems } from '../api/contestApi';
import { ContestProblem } from '../models/Contest';

export const useContestProblems = (contest_id:number) => {
  return useQuery<ContestProblem[], Error>({
    queryKey: ['contest_problems'],
    queryFn: () => fetchContestProblems(contest_id),
  });
};
