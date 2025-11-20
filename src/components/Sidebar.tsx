import { LayoutDashboard, Users, Briefcase, Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useState } from 'react';

const menuItems = [
  { title: 'Dashboard', path: '/', icon: LayoutDashboard },
  { title: 'Employees', path: '/employees', icon: Users },
  { title: 'Job Titles', path: '/job-titles', icon: Briefcase },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card text-foreground lg:hidden hover:bg-secondary transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-2xl font-bold text-primary">DashBoard</h1>
            <p className="text-xs text-sidebar-foreground mt-1">Employee Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground text-center">
              © 2024 Employee System
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
