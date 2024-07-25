// src/hooks/useContestParticipants.ts
import { useQuery } from '@tanstack/react-query';
import { fetchContestParticipantsRanked } from '../api/contestApi';
import { ContestUser } from '../api/contestApi';

export const useContestParticipants = (contest_id: number, n: number = 3) => {
  return useQuery<ContestUser[], Error>({
    queryKey: ['contest_participants'],
    queryFn: () => fetchContestParticipantsRanked(contest_id, n),
  });
};
