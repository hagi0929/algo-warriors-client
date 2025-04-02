import { useQuery } from '@tanstack/react-query';
import {fetchCodeResults} from '../api/codeSubmissionApi';

export const useCodeSubmission = (language_id: number, code: string, problem_id:number) => {
  return useQuery<any, Error>({
    queryKey: ['code_submission'],
    queryFn: () => fetchCodeResults(language_id, code, problem_id),
  });

};