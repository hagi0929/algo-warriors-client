import { 
    Contest, 
    ContestParticipant, 
    ContestProblem, 
    ContestProblemSubmission 
} from "../models/Contest";

export const fetchContests = async (): Promise<Contest[]> => {
    try {
      const response = await fetch('http://127.0.0.1:3000/contest/contests');
      if (!response.ok) {
        throw new Error(`Failed to fetch contests: ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but received ${contentType}`);
      }
  
      const data: Contest[] = await response.json();
      console.log('Fetched contests data:', data);
  
      return data; 
    } catch (error) {
      console.error('Fetch contests failed:', error);
      throw error;
    }
  };