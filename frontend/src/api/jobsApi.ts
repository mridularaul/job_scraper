
import type { JobListing } from "../types/index"

// Base URL should be updated to your actual API endpoint
const API_BASE_URL = "http://10.10.123.47:8000"

export const fetchJobs = async (): Promise<JobListing[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/scrape`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error(`Error fetching jobs: ${response.statusText}`)
    }

    const data = await response.json()

    const formattedJobs: JobListing[] = []

    // Process Internshala jobs
    if (data.internshala) {
      data.internshala.forEach((job: any, index: number) => {
        formattedJobs.push({
          id: `internshala-${index}`,
          title: job.Title,
          company: job.Company,
          location: job.Location,
          applyLink: job.Link,
          source: "Internshala",
        })
      })
    }

    // Process Careerjet jobs
    if (data.careerjet) {
      data.careerjet.forEach((job: any, index: number) => {
        formattedJobs.push({
          id: `careerjet-${index}`,
          title: job.Title,
          company: job.Company || "Not specified",
          location: job.Location || "Not specified",
          applyLink: job.Link,
          source: "CareerJet",
        })
      })
    }
    console.log("Formatted Jobs:", formattedJobs)
    return formattedJobs
  } catch (error) {
    console.error("Failed to fetch jobs:", error)
    throw error
  }
}