import { useState } from 'react';
import { Employee } from '@/api/employeeApi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Partial<Employee>) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ employee, onSubmit, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    first_name: employee?.first_name || '',
    last_name: employee?.last_name || '',
    email: employee?.email || '',
    job_title_id: employee?.job_title_id || 1,
    hire_date: employee?.hire_date || new Date().toISOString().split('T')[0],
    salary: employee?.salary || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="hire_date">Hire Date</Label>
        <Input
          id="hire_date"
          type="date"
          value={formData.hire_date}
          onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="job_title_id">Job Title ID</Label>
        <Input
          id="job_title_id"
          type="number"
          value={formData.job_title_id}
          onChange={(e) => setFormData({ ...formData, job_title_id: Number(e.target.value) })}
          required
        />
      </div>

      <div>
        <Label htmlFor="salary">Salary</Label>
        <Input
          id="salary"
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {employee ? 'Update' : 'Create'} Employee
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
