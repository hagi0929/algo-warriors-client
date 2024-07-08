import { Problem } from '../models/Problem';

export const fetchProblems = async (): Promise<Problem[]> => {
  const response = await fetch('https://api.example.com/problems');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
