import { Result } from "../models/Result";

export const fetchCodeResults = async (language_id: number, code: string, problem_id: number): Promise<Result[]> => {
  try {
    const response = await fetch('http://127.0.0.1:3000/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code,
        programming_language: language_id,
        problem_id: problem_id
      })
    });

    if (!response.ok) {
      console.error('Fetch submission failed:', response.statusText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Ensure the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected application/json but received ${contentType}`);
    }

    const data = await response.json();
    var res: Result[] = [];
    for(let i=0; i<data.length; i++) {
      res.push({
        id: i+1,
        statusDescription: data[i].status.description,
        input:data[i].stdin,
        output:data[i].stdout,
        expectedOutput:data[i].expected_output
      })
  }
    return res;
  }
  catch (error) {
    console.error('Fetch submission failed:', error);
    throw error;
  }
};
