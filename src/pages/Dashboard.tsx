import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, TrendingUp } from 'lucide-react';

// Sample data
const employeesByDepartment = [
  { name: 'Engineering', value: 45 },
  { name: 'Sales', value: 32 },
  { name: 'Marketing', value: 28 },
  { name: 'HR', value: 15 },
];

const salaryTrend = [
  { month: 'Jan', average: 75000 },
  { month: 'Feb', average: 77000 },
  { month: 'Mar', average: 78000 },
  { month: 'Apr', average: 80000 },
  { month: 'May', average: 82000 },
  { month: 'Jun', average: 85000 },
];

const hiringTrend = [
  { month: 'Jan', hires: 8 },
  { month: 'Feb', hires: 12 },
  { month: 'Mar', hires: 15 },
  { month: 'Apr', hires: 10 },
  { month: 'May', hires: 18 },
  { month: 'Jun', hires: 14 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your employee management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-3xl font-bold text-foreground mt-2">120</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Job Titles</p>
              <p className="text-3xl font-bold text-foreground mt-2">24</p>
            </div>
            <div className="p-3 rounded-lg bg-chart-2/10">
              <Briefcase className="text-chart-2" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Salary</p>
              <p className="text-3xl font-bold text-foreground mt-2">$85K</p>
            </div>
            <div className="p-3 rounded-lg bg-chart-3/10">
              <TrendingUp className="text-chart-3" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Employees by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeesByDepartment}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {employeesByDepartment.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Average Salary Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="average" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Hiring Trend (6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hiringTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="hires"
              stroke="hsl(var(--chart-2))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-2))', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
