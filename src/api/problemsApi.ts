import { PagenationState } from '../models/Etc';
import { AbstractProblem, ProblemFilterOptions } from '../models/Problem';


export const fetchProblems = async (filters: ProblemFilterOptions | null, pagenation: PagenationState | null): Promise<AbstractProblem[]> => {
  const queryParams = new URLSearchParams();

  if (filters?.title) queryParams.append('title', filters.title);
  if (filters?.difficulty) queryParams.append('difficulty', filters.difficulty.join(','));
  if (filters?.categories) queryParams.append('categories', filters.categories.join(','));
  if (filters?.contest_id) queryParams.append('contest_id', filters.contest_id.toString());
  if (filters?.sort_by) queryParams.append('sort_by', filters.sort_by);
  if (pagenation?.pageIndex) queryParams.append('page_index', pagenation.pageIndex.toString());
  if (pagenation?.pageSize) queryParams.append('page_size', pagenation.pageSize.toString());

  const response = await fetch(`http://127.0.0.1:3000/problem/dashboard-list?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
