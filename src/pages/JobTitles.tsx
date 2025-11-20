import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { jobTitleApi, JobTitle } from '@/api/jobTitleApi';
import { JobTitleForm } from '@/components/JobTitleForm';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { toast } from 'sonner';

const JobTitles = () => {
  const queryClient = useQueryClient();
  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitle | null>(null);

  // Fetch job titles
  const { data: jobTitles = [], isLoading } = useQuery({
    queryKey: ['jobTitles'],
    queryFn: jobTitleApi.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: jobTitleApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobTitles'] });
      createModal.close();
      toast.success('Job title created successfully');
    },
    onError: () => {
      toast.error('Failed to create job title');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<JobTitle> }) =>
      jobTitleApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobTitles'] });
      editModal.close();
      setSelectedJobTitle(null);
      toast.success('Job title updated successfully');
    },
    onError: () => {
      toast.error('Failed to update job title');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: jobTitleApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobTitles'] });
      deleteModal.close();
      setSelectedJobTitle(null);
      toast.success('Job title deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete job title');
    },
  });

  const handleEdit = (jobTitle: JobTitle) => {
    setSelectedJobTitle(jobTitle);
    editModal.open();
  };

  const handleDelete = (jobTitle: JobTitle) => {
    setSelectedJobTitle(jobTitle);
    deleteModal.open();
  };

  const handleCreateSubmit = (data: Partial<JobTitle>) => {
    createMutation.mutate(data as Omit<JobTitle, 'job_title_id'>);
  };

  const handleEditSubmit = (data: Partial<JobTitle>) => {
    if (selectedJobTitle) {
      updateMutation.mutate({ id: selectedJobTitle.job_title_id, data });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedJobTitle) {
      deleteMutation.mutate(selectedJobTitle.job_title_id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Titles</h1>
          <p className="text-muted-foreground mt-1">Manage job positions and roles</p>
        </div>
        <Button onClick={createModal.open}>
          <Plus size={20} className="mr-2" />
          Add Job Title
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading job titles...</div>
      ) : jobTitles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No job titles found. Create your first job title!</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Salary Range</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobTitles.map((jobTitle) => (
                  <tr
                    key={jobTitle.job_title_id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      #{jobTitle.job_title_id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {jobTitle.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {jobTitle.department || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {jobTitle.min_salary && jobTitle.max_salary
                        ? `$${jobTitle.min_salary.toLocaleString()} - $${jobTitle.max_salary.toLocaleString()}`
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(jobTitle)}
                          className="p-2 rounded-lg hover:bg-secondary transition-colors text-primary"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(jobTitle)}
                          className="p-2 rounded-lg hover:bg-secondary transition-colors text-destructive"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={createModal.isOpen} onClose={createModal.close} title="Create Job Title">
        <JobTitleForm onSubmit={handleCreateSubmit} onCancel={createModal.close} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.close} title="Edit Job Title">
        {selectedJobTitle && (
          <JobTitleForm
            jobTitle={selectedJobTitle}
            onSubmit={handleEditSubmit}
            onCancel={editModal.close}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDeleteConfirm}
        title="Delete Job Title"
        message={`Are you sure you want to delete "${selectedJobTitle?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default JobTitles;
