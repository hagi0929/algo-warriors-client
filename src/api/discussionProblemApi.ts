import { Discussion } from "../models/Discussion";

export const fetchDiscussionsByProblem = async (problemId: number): Promise<Discussion[]> => {
    try {
        const response = await fetch(`http://10.32.124.68:3000/discussions/problem/${problemId}`);
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
        const response = await fetch(`http://10.32.124.68:3000/discussions/discussion/${discussionId}`);
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

        return data[0]; // Return the first result from the array
    } catch (error) {
        console.error('Fetch discussions failed:', error);
        throw error;
    }
};

export const fetchDiscussionsReplies = async (discussionId: number): Promise<Discussion[]> => {
    try {
        const response = await fetch(`http://10.32.124.68:3000/discussions/thread/${discussionId}`);
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