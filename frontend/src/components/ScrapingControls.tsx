import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ScrapingStatus } from '../types/index';

interface ScrapingControlsProps {
  status: ScrapingStatus;
  onTriggerScrape: () => void;
}

const ScrapingControls: React.FC<ScrapingControlsProps> = ({ 
  status, 
  onTriggerScrape 
}) => {
  const { isLoading, error, lastScraped } = status;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Job Scraping Controls</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lastScraped 
              ? `Last scraped: ${formatDate(lastScraped)}` 
              : 'No recent scraping activity'}
          </p>
        </div>
        
        <div className="mt-3 sm:mt-0">
          <button
            onClick={onTriggerScrape}
            disabled={isLoading}
            className={`
              flex items-center px-4 py-2 rounded-md text-white 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Scraping...' : 'Trigger Scraping'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm rounded-md">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ScrapingControls;