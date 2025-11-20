import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { employeeApi, Employee } from '@/api/employeeApi';
import { EmployeeCard } from '@/components/EmployeeCard';
import { EmployeeTable } from '@/components/EmployeeTable';
import { EmployeeForm } from '@/components/EmployeeForm';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { useToggleView } from '@/hooks/useToggleView';
import { useModal } from '@/hooks/useModal';
import { toast } from 'sonner';

const Employees = () => {
  const queryClient = useQueryClient();
  const { viewMode, toggleView } = useToggleView('card');
  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Fetch employees
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeApi.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: employeeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      createModal.close();
      toast.success('Employee created successfully');
    },
    onError: () => {
      toast.error('Failed to create employee');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Employee> }) =>
      employeeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      editModal.close();
      setSelectedEmployee(null);
      toast.success('Employee updated successfully');
    },
    onError: () => {
      toast.error('Failed to update employee');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: employeeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      deleteModal.close();
      setSelectedEmployee(null);
      toast.success('Employee deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete employee');
    },
  });

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    editModal.open();
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    deleteModal.open();
  };

  const handleCreateSubmit = (data: Partial<Employee>) => {
    createMutation.mutate(data as Omit<Employee, 'employee_number'>);
  };

  const handleEditSubmit = (data: Partial<Employee>) => {
    if (selectedEmployee) {
      updateMutation.mutate({ id: selectedEmployee.employee_number, data });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      deleteMutation.mutate(selectedEmployee.employee_number);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleView}
            className="hover:bg-secondary"
          >
            {viewMode === 'card' ? <List size={20} /> : <LayoutGrid size={20} />}
          </Button>
          <Button onClick={createModal.open}>
            <Plus size={20} className="mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading employees...</div>
      ) : employees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No employees found. Create your first employee!</p>
        </div>
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.employee_number}
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={createModal.isOpen} onClose={createModal.close} title="Create Employee">
        <EmployeeForm onSubmit={handleCreateSubmit} onCancel={createModal.close} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.close} title="Edit Employee">
        {selectedEmployee && (
          <EmployeeForm
            employee={selectedEmployee}
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
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.first_name} ${selectedEmployee?.last_name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Employees;
