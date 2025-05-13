import React, { useState } from 'react';
import { JobListing } from '../types';
import { ExternalLink, ArrowUpDown, Calendar, Building, MapPin, Clock, Wallet } from 'lucide-react';

interface JobsTableProps {
  jobs: JobListing[];
  isLoading: boolean;
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs, isLoading }) => {
  const [sortBy, setSortBy] = useState<keyof JobListing>('postedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterSource, setFilterSource] = useState<string>('all');
  
  const handleSort = (column: keyof JobListing) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  const sortedJobs = [...jobs].sort((a, b) => {
    if (!a[sortBy] && !b[sortBy]) return 0;
    if (!a[sortBy]) return 1;
    if (!b[sortBy]) return -1;
    
    const aValue = a[sortBy]?.toString().toLowerCase() || '';
    const bValue = b[sortBy]?.toString().toLowerCase() || '';
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  
  const filteredJobs = filterSource === 'all' 
    ? sortedJobs 
    : sortedJobs.filter(job => job.source.toLowerCase() === filterSource.toLowerCase());
  
  const SortIcon = ({ column }: { column: keyof JobListing }) => (
    <ArrowUpDown 
      className={`inline-block ml-1 w-4 h-4 transition-colors ${
        sortBy === column ? 'text-blue-600' : 'text-gray-400'
      }`}
    />
  );
  
  const sourceColors = {
    'Internshala': 'bg-blue-100 text-blue-800',
    'LinkedIn': 'bg-cyan-100 text-cyan-800',
    'Naukri': 'bg-emerald-100 text-emerald-800',
  };
  
  if (isLoading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-lg text-gray-600">Loading job listings...</p>
      </div>
    );
  }
  
  if (filteredJobs.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center">
        <p className="text-lg text-gray-600">
          {jobs.length === 0 
            ? "No job listings available. Try triggering a scrape." 
            : "No jobs match your current filters."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-y-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Job Listings <span className="text-sm font-normal text-gray-500">({filteredJobs.length} results)</span>
        </h2>
        
        <div className="flex items-center space-x-3">
          <label htmlFor="sourceFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Source:
          </label>
          <select
            id="sourceFilter"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Sources</option>
            <option value="internshala">Internshala</option>
            <option value="linkedin">LinkedIn</option>
            <option value="naukri">Naukri</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('title')}
              >
                Title <SortIcon column="title" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('company')}
              >
                Company <SortIcon column="company" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('location')}
              >
                Location <SortIcon column="location" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('duration')}
              >
                Duration <SortIcon column="duration" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('stipend')}
              >
                Stipend <SortIcon column="stipend" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('postedDate')}
              >
                Posted <SortIcon column="postedDate" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('source')}
              >
                Source <SortIcon column="source" />
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Apply
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredJobs.map((job) => (
              <tr 
                key={job.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white flex items-center">
                    <Building className="w-4 h-4 mr-1 text-gray-400" />
                    {job.company}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.duration || 'Not specified'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Wallet className="w-4 h-4 mr-1" />
                    {job.stipend}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    sourceColors[job.source as keyof typeof sourceColors]
                  }`}>
                    {job.source}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 flex items-center justify-end"
                  >
                    Apply <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;