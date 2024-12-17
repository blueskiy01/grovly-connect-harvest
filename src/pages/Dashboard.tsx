import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ListingsManager from '@/components/dashboard/ListingsManager';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

const Dashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserId(user.id);
          setUserRole(profile.role);
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (!userId || !userRole) {
    return (
      <div>
        <Navigation />
        <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">
              {userRole === 'farmer' && "Manage your listings and track interest in your produce."}
              {userRole === 'consumer' && "Track your saved listings and manage your interests."}
              {userRole === 'business' && "Monitor your resource sharing and community impact."}
            </p>
          </div>

          <div className="mt-8">
            <DashboardMetrics userId={userId} role={userRole} />
            <ListingsManager role={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;