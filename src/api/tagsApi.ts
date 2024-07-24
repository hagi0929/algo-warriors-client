import { Tag } from '../models/Tag';

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await fetch('http://127.0.0.1:3000/tag/list');
    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but received ${contentType}`);
    }

    const data: Tag[] = await response.json();
    console.log('Fetched tags data:', data);

    return data; 
  } catch (error) {
    console.error('Fetch tags failed:', error);
    throw error;
  }
};
