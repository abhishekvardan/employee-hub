import { useState } from 'react';
import { JobTitle } from '@/api/jobTitleApi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface JobTitleFormProps {
  jobTitle?: JobTitle;
  onSubmit: (data: Partial<JobTitle>) => void;
  onCancel: () => void;
}

export const JobTitleForm = ({ jobTitle, onSubmit, onCancel }: JobTitleFormProps) => {
  const [formData, setFormData] = useState({
    title: jobTitle?.title || '',
    department: jobTitle?.department || '',
    min_salary: jobTitle?.min_salary || 0,
    max_salary: jobTitle?.max_salary || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="department">Department</Label>
        <Input
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min_salary">Min Salary</Label>
          <Input
            id="min_salary"
            type="number"
            value={formData.min_salary}
            onChange={(e) => setFormData({ ...formData, min_salary: Number(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="max_salary">Max Salary</Label>
          <Input
            id="max_salary"
            type="number"
            value={formData.max_salary}
            onChange={(e) => setFormData({ ...formData, max_salary: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {jobTitle ? 'Update' : 'Create'} Job Title
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
