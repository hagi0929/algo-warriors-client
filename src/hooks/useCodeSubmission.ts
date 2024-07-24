import { useQuery } from '@tanstack/react-query';
import { fetchProblems,fetchProblemDescription } from '../api/problemsApi';
import {fetchCodeResults} from '../api/codeSubmissionApi';
import { Problem } from '../models/Problem';

export const useCodeSubmission = (language_id: number, code: string, problem_id:number) => {
  return useQuery<any, Error>({
    queryKey: ['code_submission'],
    queryFn: () => fetchCodeResults(language_id, code, problem_id),
  });

};