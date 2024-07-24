import { Resource } from '../models/Resource';

export const fetchResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch('http://127.0.0.1:3000/popup-resources');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch resources failed:', error);
    throw error;
  }
};

export const searchResources = async (keyword: string): Promise<Resource[]> => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/popup-resources/search?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Search resources failed:', error);
    throw error;
  }
};
