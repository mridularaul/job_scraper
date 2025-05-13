import React, { useState, useEffect } from 'react';
import JobsTable from './JobsTable.tsx';
import ScrapingControls from './ScrapingControls';
import { JobListing, ScrapingStatus } from '../types/index.ts';
// import { fetchJobs, triggerScraping } from '../api/jobsApi.ts';

// Mock data for development - replace with actual API calls in production
import { mockJobs } from '../mockData.ts';

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [scrapingStatus, setScrapingStatus] = useState<ScrapingStatus>({
    isLoading: false,
    error: null,
    lastScraped: null,
  });
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);

  const loadJobs = async () => {
    setIsLoadingJobs(true);
    try {
      // In development, use mock data to avoid API dependency
      // In production, uncomment the following line to fetch real data
      // const jobsData = await fetchJobs();
      const jobsData = mockJobs;
      setJobs(jobsData);
    } catch (error) {
      console.error('Failed to load jobs', error);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const handleTriggerScrape = async () => {
    setScrapingStatus({
      ...scrapingStatus,
      isLoading: true,
      error: null,
    });

    try {
      // Simulating API call for development
      // In production, uncomment the following line
      // await triggerScraping();
      
      // Simulate scraping delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await loadJobs();
      
      setScrapingStatus({
        isLoading: false,
        error: null,
        lastScraped: new Date(),
      });
    } catch (error) {
      setScrapingStatus({
        ...scrapingStatus,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ScrapingControls 
        status={scrapingStatus}
        onTriggerScrape={handleTriggerScrape}
      />
      
      <JobsTable 
        jobs={jobs}
        isLoading={isLoadingJobs}
      />
    </div>
  );
};

export default Dashboard;