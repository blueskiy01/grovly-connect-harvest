import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

interface DashboardMetricsProps {
  userId: string;
  role: UserRole;
}

const DashboardMetrics = ({ userId, role }: DashboardMetricsProps) => {
  const [metrics, setMetrics] = useState({
    activeListings: 0,
    totalInterests: 0,
    resourcesShared: 0,
    savedListings: 0,
    preOrders: 0,
    wasteReused: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      // Get active listings count
      const { count: listingsCount } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'active');

      // Get saved listings count
      const { count: savedCount } = await supabase
        .from('saved_listings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      setMetrics(prev => ({
        ...prev,
        activeListings: listingsCount || 0,
        savedListings: savedCount || 0
      }));
    };

    fetchMetrics();
  }, [userId]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {role === 'farmer' && (
        <>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Current Listings</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.activeListings}</p>
            <p className="mt-1 text-sm text-gray-500">{metrics.totalInterests} people interested</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Resources Shared</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.resourcesShared}kg</p>
            <p className="mt-1 text-sm text-gray-500">coffee grounds</p>
          </div>
        </>
      )}

      {role === 'consumer' && (
        <>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Saved Listings</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.savedListings}</p>
            <p className="mt-1 text-sm text-gray-500">2 interests shared</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Pre-orders Made</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.preOrders}</p>
          </div>
        </>
      )}

      {role === 'business' && (
        <>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Resources Listed</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.activeListings}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Impact</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{metrics.wasteReused}kg</p>
            <p className="mt-1 text-sm text-gray-500">waste reused</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardMetrics;