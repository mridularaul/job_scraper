export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    duration?: string;
    stipend: string;
    postedDate: string;
    applyLink: string;
    source: 'Internshala' | 'LinkedIn' | 'Naukri';
    description?: string;
    skills?: string[];
    experience?: string;
  }
  
  export interface ScrapingStatus {
    isLoading: boolean;
    error: string | null;
    lastScraped: Date | null;
  }