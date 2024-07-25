import { useQuery } from '@tanstack/react-query';
import { fetchContestDescription } from '../api/contestApi';

export const useContestDescription = (contest_id:number) => {
  return useQuery<string, Error>({
    queryKey: ['contest_description'],
    queryFn: () => fetchContestDescription(contest_id),
  });
};
