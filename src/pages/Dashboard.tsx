import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import ListingsManager from '@/components/dashboard/ListingsManager';
import MessagingSection from '@/components/dashboard/MessagingSection';
import { Database } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';

type UserRole = Database['public']['Enums']['user_role'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ id: string; role: UserRole } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        setUser(session.user);
        
        // First get the user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          throw profileError;
        }

        if (!profileData) {
          console.error('No profile found');
          navigate('/login');
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  if (loading || !profile) {
    return (
      <div>
        <Navigation />
        <div className="pt-20 flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <DashboardMetrics userId={profile.id} role={profile.role} />
          <ListingsManager userId={profile.id} role={profile.role} />
          <MessagingSection userId={profile.id} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;