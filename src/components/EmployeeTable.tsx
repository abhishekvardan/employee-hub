import { Edit2, Trash2 } from 'lucide-react';
import { Employee } from '@/api/employeeApi';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeTable = ({ employees, onEdit, onDelete }: EmployeeTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Hire Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Salary</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.employee_number}
              className="border-b border-border hover:bg-secondary/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-muted-foreground">
                #{employee.employee_number}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-foreground">
                {employee.first_name} {employee.last_name}
              </td>
              <td className="px-4 py-3 text-sm text-foreground">{employee.email}</td>
              <td className="px-4 py-3 text-sm text-foreground">
                {new Date(employee.hire_date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-primary">
                {employee.salary ? `$${employee.salary.toLocaleString()}` : '-'}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors text-primary"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(employee)}
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
  );
};
