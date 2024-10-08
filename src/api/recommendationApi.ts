import { Problem } from "../models/Problem";

export const fetchRecommendedProblems = async (id:number): Promise<Problem[]> => {
    try {
        console.log("fetching recommended problems");
        console.log("id: ", id);
      const response = await fetch('http://127.0.0.1:3000/tag/recommend/' + id);
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
    var res: Problem[] = [];
    for(let i=0; i<data.length; i++) {
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