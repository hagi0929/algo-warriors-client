import { useQuery } from '@tanstack/react-query';
import { Problem } from '../models/Problem';
import { fetchContests } from '../api/contestsApi';

export const useContests = () => {
  return useQuery<Problem[], Error>({
    queryKey: ['contests'],
    queryFn: fetchContests,
  });

};
