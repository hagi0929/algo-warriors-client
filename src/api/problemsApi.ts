import { Problem } from '../models/Problem';

export const fetchProblems = async (): Promise<Problem[]> => {
  const response = await fetch('http://127.0.0.1:3000/problem/list');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
