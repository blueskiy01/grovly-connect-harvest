import Navigation from '@/components/Navigation';

const Dashboard = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4">Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;