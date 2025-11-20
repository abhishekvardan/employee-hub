import axiosClient from './axiosClient';

export interface JobTitle {
  job_title_id: number;
  title: string;
  department?: string;
  min_salary?: number;
  max_salary?: number;
}

export const jobTitleApi = {
  getAll: async (): Promise<JobTitle[]> => {
    const response = await axiosClient.get<JobTitle[]>('/job_titles/');
    return response.data;
  },

  getById: async (jobTitleId: number): Promise<JobTitle> => {
    const response = await axiosClient.get<JobTitle>(`/job_titles/${jobTitleId}`);
    return response.data;
  },

  create: async (jobTitle: Omit<JobTitle, 'job_title_id'>): Promise<JobTitle> => {
    const response = await axiosClient.post<JobTitle>('/job_titles/', jobTitle);
    return response.data;
  },

  update: async (jobTitleId: number, jobTitle: Partial<JobTitle>): Promise<JobTitle> => {
    const response = await axiosClient.put<JobTitle>(`/job_titles/${jobTitleId}`, jobTitle);
    return response.data;
  },

  delete: async (jobTitleId: number): Promise<void> => {
    await axiosClient.delete(`/job_titles/${jobTitleId}`);
  },
};
