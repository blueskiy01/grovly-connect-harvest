import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProfileHeader from './ProfileHeader';
import ActivitySnapshot from './ActivitySnapshot';
import { Database } from '@/integrations/supabase/types';
import { useToast } from "@/components/ui/use-toast";

type Profile = Database['public']['Tables']['profiles']['Row'];

const PublicProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error: any) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id, toast]);

  if (loading) {
    return <div className="pt-20 flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!profile) {
    return <div className="pt-20 flex justify-center items-center min-h-screen">Profile not found</div>;
  }

  const getInitials = (name: string | null) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase()
      : '?';
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto p-6">
      <div className="bg-cream rounded-lg p-8 shadow-sm">
        <ProfileHeader
          displayName={profile.display_name || ''}
          role={profile.role}
          getInitials={getInitials}
        />
        
        {profile.bio && (
          <div className="mt-4 text-gray-600">
            <p>{profile.bio}</p>
          </div>
        )}

        {profile.show_contact_info && (
          <div className="mt-4 space-y-2">
            {profile.location && (
              <p className="text-sm text-gray-600">📍 {profile.location}</p>
            )}
            {profile.phone && (
              <p className="text-sm text-gray-600">📞 {profile.phone}</p>
            )}
          </div>
        )}

        <ActivitySnapshot userId={profile.id} role={profile.role} />
      </div>
    </div>
  );
};

export default PublicProfileView;