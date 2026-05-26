import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Calendar, Users, Briefcase, Settings, LogOut, Scissors, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SidebarLink = ({ to, icon: Icon, children, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-amber-500/10 text-amber-500'
        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{children}</span>
  </Link>
);

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-lg">
            <Scissors className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold text-amber-500 tracking-tight">Salon AI</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <SidebarLink to="/dashboard" icon={LayoutDashboard} active={location.pathname === '/dashboard'}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/dashboard/appointments" icon={Calendar} active={location.pathname === '/dashboard/appointments'}>
            Appointments
          </SidebarLink>
          <SidebarLink to="/dashboard/customers" icon={Users} active={location.pathname === '/dashboard/customers'}>
            Customers
          </SidebarLink>
          <SidebarLink to="/dashboard/services" icon={Briefcase} active={location.pathname === '/dashboard/services'}>
            Services
          </SidebarLink>
          {user?.role === 'ADMIN' && (
            <SidebarLink to="/dashboard/settings" icon={Settings} active={location.pathname === '/dashboard/settings'}>
              Settings
            </SidebarLink>
          )}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-zinc-500 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center space-x-2">
            <Scissors className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-amber-500">Salon AI</span>
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6 text-zinc-400" />
          </Button>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-zinc-950/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
