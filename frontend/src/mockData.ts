import { JobListing } from './types';

export const mockJobs: JobListing[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Bangalore',
    duration: '6 months',
    stipend: '₹25,000/month',
    postedDate: '2024-03-15',
    applyLink: 'https://example.com/apply/frontend-dev',
    source: 'Internshala',
    description: 'We are looking for a skilled Frontend Developer intern with knowledge of React.',
    skills: ['React', 'TypeScript', 'CSS', 'HTML']
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'DataMinds',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹20,000/month',
    postedDate: '2024-03-14',
    applyLink: 'https://example.com/apply/data-science-intern',
    source: 'Internshala',
    description: 'Join our data science team to work on exciting ML projects.',
    skills: ['Python', 'Machine Learning', 'Data Analysis']
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'InnovateX',
    location: 'Hyderabad',
    duration: 'Full-time',
    stipend: '₹12-18 LPA',
    postedDate: '2024-03-13',
    applyLink: 'https://example.com/apply/software-engineer',
    source: 'LinkedIn',
    description: 'Looking for experienced software engineers to join our team.',
    skills: ['Java', 'Spring Boot', 'MySQL']
  }
];