import axiosClient from './axiosClient';

export interface Employee {
  employee_number: number;
  first_name: string;
  last_name: string;
  email: string;
  job_title_id: number;
  hire_date: string;
  salary?: number;
}

export const employeeApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await axiosClient.get<Employee[]>('/employees/');
    return response.data;
  },

  getById: async (employeeNumber: number): Promise<Employee> => {
    const response = await axiosClient.get<Employee>(`/employees/${employeeNumber}`);
    return response.data;
  },

  create: async (employee: Omit<Employee, 'employee_number'>): Promise<Employee> => {
    const response = await axiosClient.post<Employee>('/employees/', employee);
    return response.data;
  },

  update: async (employeeNumber: number, employee: Partial<Employee>): Promise<Employee> => {
    const response = await axiosClient.put<Employee>(`/employees/${employeeNumber}`, employee);
    return response.data;
  },

  delete: async (employeeNumber: number): Promise<void> => {
    await axiosClient.delete(`/employees/${employeeNumber}`);
  },
};
