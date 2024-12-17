import Navigation from '@/components/Navigation';

const Settings = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-4">Manage your account settings.</p>
      </div>
    </div>
  );
};

export default Settings;