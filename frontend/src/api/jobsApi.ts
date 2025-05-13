import { JobListing } from '../types/index';

// Base URL should be updated to your actual API endpoint
const API_BASE_URL = 'http://localhost:8000';

export const fetchJobs = async (): Promise<JobListing[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    
    if (!response.ok) {
      throw new Error(`Error fetching jobs: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw error;
  }
};

export const triggerScraping = async (): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error triggering scraping: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to trigger scraping:', error);
    throw error;
  }
};