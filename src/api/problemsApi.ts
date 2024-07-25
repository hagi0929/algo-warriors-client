import { PagenationState } from '../models/Etc';
import { AbstractProblem, Problem, ProblemFilterOptions, ProblemMinimal } from '../models/Problem';

export const fetchProblems = async (): Promise<ProblemMinimal[]> => {
  try {
    const response = await fetch('http://127.0.0.1:3000/problem/list');
    if (!response.ok) {
      console.error('Fetch problems failed:', response.statusText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // Ensure the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected application/json but received ${contentType}`);
    }

    const data = await response.json();

    // Log the data to ensure it's correctly parsed
    console.log('Fetched problems:', data);
    var res: ProblemMinimal[] = [];
    for (let i = 0; i < data.length; i++) {
      res.push({
        id: data[i].problem_id,
        title: data[i].title,
        description: '',
        status: '',
        date: '',
        value: ''
      });
    }
    return res; // Return parsed data
  } catch (error) {
    console.error('Fetch problems failed:', error);
    throw error;
  }
};


export const fetchProblemDescription = async (id: string): Promise<Problem[]> => {
  try {
    const response = await fetch('http://127.0.0.1:3000/problem/' + id);
    if (!response.ok) {
      console.error('Fetch problems failed:', response.statusText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // Ensure the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected application/json but received ${contentType}`);
    }

    const data = await response.json();

    // Log the data to ensure it's correctly parsed
    console.log('Fetched problem data:', data);

    return data.description; // Return parsed data
  } catch (error) {
    console.error('Fetch problems failed:', error);
    throw error;
  }
};
export const fetchDashboardProblems = async (filters: ProblemFilterOptions | null, pagenation: PagenationState | null): Promise<AbstractProblem[]> => {
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
  return await response.json();
};
