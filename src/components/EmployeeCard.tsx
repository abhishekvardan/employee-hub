import { Edit2, Trash2, Mail, Calendar } from 'lucide-react';
import { Employee } from '@/api/employeeApi';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeCard = ({ employee, onEdit, onDelete }: EmployeeCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {employee.first_name} {employee.last_name}
          </h3>
          <p className="text-sm text-muted-foreground">#{employee.employee_number}</p>
        </div>
        <div className="flex gap-2">
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
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Mail size={14} className="text-muted-foreground" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar size={14} className="text-muted-foreground" />
          <span>Hired: {new Date(employee.hire_date).toLocaleDateString()}</span>
        </div>
        {employee.salary && (
          <div className="mt-3 pt-3 border-t border-border">
            <span className="text-lg font-semibold text-primary">
              ${employee.salary.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground ml-2">/ year</span>
          </div>
        )}
      </div>
    </div>
  );
};
