export interface JobListing {
  id: string;
    title: string;
    company: string;
    location: string;
    applyLink: string;
    source: 'Internshala' | 'CareerJet';
  }
  
  export interface ScrapingStatus {
    isLoading: boolean;
    error: string | null;
    lastScraped: Date | null;
  }