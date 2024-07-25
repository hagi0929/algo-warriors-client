import { 
    Contest, 
    ContestParticipant, 
    ContestProblem, 
    ContestProblemSubmission 
} from "../models/Contest";

export interface ContestUser {
  user_id: number;
  username: string;
  score: number;
  last_submission: string;
}

// Get contests
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
  
      const data = await response.json();
      var res: Contest[] = [];
        for(let i=0; i<data.length; i++) {
          res.push({
            id: data[i].contest_id,
            title: data[i].title,
            description: data[i].description,
            start_time: data[i].start_time,
            end_time: data[i].end_time,
            created_by: data[i].created_by,
            created_at: data[i].created_at,
            winner: data[i].winner
          });
        }
      console.log('Fetched contests data:', res);
  
      return res; 
    } catch (error) {
      console.error('Fetch contests failed:', error);
      throw error;
    }
  };

// Get contest problems
export const fetchContestProblems = async (contest_id:number): Promise<ContestProblem[]> => {
    try {
      const response = await fetch('http://127.0.0.1:3000/contest/contests/' + contest_id + '/problems');
      if (!response.ok) {
        throw new Error(`Failed to fetch contests: ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but received ${contentType}`);
      }
  
      const data: ContestProblem[] = await response.json();
      console.log('Fetched contests data:', data);
  
      return data; 
    } catch (error) {
      console.error('Fetch contests failed:', error);
      throw error;
    }
  };

  export const fetchContestDescription = async (contest_id:Number): Promise<string> => {
    try {
      const response = await fetch('http://127.0.0.1:3000/contest/contests');
      if (!response.ok) {
        throw new Error(`Failed to fetch contests: ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but received ${contentType}`);
      }
  
      const data = await response.json();
        for(let i=0; i<data.length; i++) {
          if (data[i].contest_id == contest_id) {
            return data[i].description;
          }
        }
      return ''; 
    } catch (error) {
      console.error('Fetch contests failed:', error);
      throw error;
    }
  };


  // Get scores
  // src/api/contestApi.ts
export const fetchContestParticipantsRanked = async (contest_id: number, n: number = 3): Promise<ContestUser[]> => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/contest/contests/${contest_id}/participants/ranked?n=${n}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch contest participants: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but received ${contentType}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch contest participants failed:', error);
    throw error;
  }
};

      