import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';

const mockChartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const mockAppointments = [
  { id: 1, customer: 'Jane Doe', service: 'Haircut & Styling', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, customer: 'John Smith', service: 'Massage Therapy', time: '11:30 AM', status: 'Pending' },
  { id: 3, customer: 'Emily Chen', service: 'Manicure', time: '01:15 PM', status: 'Completed' },
  { id: 4, customer: 'Michael Brown', service: 'Beard Trim', time: '03:00 PM', status: 'Confirmed' },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      <Icon className="w-4 h-4 text-amber-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-zinc-100">{value}</div>
      <p className="text-xs text-zinc-500 mt-1">{trend}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-zinc-400 mt-2">Here is what's happening at your salon today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend="+20.1% from last month" />
        <StatCard title="Appointments" value="+2350" icon={Users} trend="+180.1% from last month" />
        <StatCard title="Services Done" value="+12,234" icon={CreditCard} trend="+19% from last month" />
        <StatCard title="Active Staff" value="24" icon={Activity} trend="+201 since last hour" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{apt.customer}</p>
                    <p className="text-xs text-zinc-400">{apt.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-100">{apt.time}</p>
                    <p className={`text-xs ${apt.status === 'Confirmed' ? 'text-green-500' : apt.status === 'Completed' ? 'text-blue-500' : 'text-amber-500'}`}>
                      {apt.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
