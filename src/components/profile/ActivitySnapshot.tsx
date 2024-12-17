import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

interface ActivitySnapshotProps {
  userId: string;
  role?: UserRole;
}

const ActivitySnapshot = ({ userId, role }: ActivitySnapshotProps) => {
  const [activeListings, setActiveListings] = useState(0);
  const [savedListings, setSavedListings] = useState(0);

  useEffect(() => {
    const fetchActivity = async () => {
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

      setActiveListings(listingsCount || 0);
      setSavedListings(savedCount || 0);
    };

    fetchActivity();
  }, [userId]);

  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {role === 'farmer' && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Active Listings</p>
            <p className="text-2xl font-bold text-green-700">{activeListings}</p>
          </div>
        )}
        {role === 'consumer' && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Saved Listings</p>
            <p className="text-2xl font-bold text-purple-700">{savedListings}</p>
          </div>
        )}
        {role === 'business' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Resources Listed</p>
            <p className="text-2xl font-bold text-blue-700">{activeListings}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySnapshot;