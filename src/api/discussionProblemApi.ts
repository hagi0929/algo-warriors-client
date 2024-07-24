import { Discussion } from "../models/Discussion";

export const fetchDiscussionsByProblem = async (problemId: number): Promise<Discussion[]> => {
    try {
        console.log(problemId);
        const response = await fetch(`http://127.0.0.1:3000/discussions/problem/${problemId}`);
        if (!response.ok) {
        throw new Error(`Failed to fetch discussions: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON but received ${contentType}`);
        }

        const data = await response.json();
        console.log('Fetched discussions data:', data);
  
        // Filter discussions with parentdiscussion_id === null
        const topLevelDiscussions = data.filter((discussion: Discussion) => discussion.parentdiscussion_id === null);

        return topLevelDiscussions;
    } catch (error) {
      console.error('Fetch discussions failed:', error);
      throw error;
    }
};

export const fetchDiscussionsById = async (discussionId: number): Promise<Discussion> => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/discussions/discussion/${discussionId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch discussions: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON but received ${contentType}`);
        }

        const data: Discussion = await response.json();
        console.log('Fetched discussions data:', data);

        return data;
    } catch (error) {
        console.error('Fetch discussions failed:', error);
        throw error;
    }
};

export const fetchDiscussionsReplies = async (discussionId: number): Promise<Discussion[]> => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/discussions/thread/${discussionId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch discussions: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON but received ${contentType}`);
        }

        const data: Discussion[] = await response.json(); // Assuming the API returns an array of discussions
        console.log('Fetched discussions data:', data);

        if (data.length === 0) {
            throw new Error('No discussions found');
        }

        return data;
    } catch (error) {
        console.error('Fetch discussions failed:', error);
        throw error;
    }
};

export const createDiscussion = async (
    problemId: number,
    parentdiscussionId: number | null,
    userId: number,
    title: string | null,
    content: string
  ) =>  {
    
    const requestData = {
      problem_id: problemId,
      parentdiscussion_id: parentdiscussionId,
      user_id: userId,
      title: title,
      content: content
    };
    
    try {
        const response = await fetch(`http://127.0.0.1:3000/discussions/${problemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Discussion created:', responseData);
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };
    