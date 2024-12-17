import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';

interface Profile {
  id: string;
  role: 'farmer' | 'consumer' | 'business';
  display_name: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  show_contact_info: boolean | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
      setEmail(session.user.email);
      fetchProfile(session.user.id);
    };

    getUser();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setLocation(data.location || '');
        setPhone(data.phone || '');
        setShowContactInfo(data.show_contact_info || false);
      }
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

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          bio,
          location,
          phone,
          show_contact_info: showContactInfo,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string | null) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase()
      : '?';
  };

  if (loading && !profile) {
    return (
      <div>
        <Navigation />
        <div className="pt-20 flex justify-center items-center min-h-screen">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="pt-20 max-w-3xl mx-auto p-6">
        <div className="bg-cream rounded-lg p-8 shadow-sm">
          <ProfileHeader
            displayName={displayName}
            role={profile?.role}
            getInitials={getInitials}
          />
          <ProfileForm
            displayName={displayName}
            bio={bio}
            location={location}
            email={email}
            phone={phone}
            showContactInfo={showContactInfo}
            loading={loading}
            onSubmit={updateProfile}
            onDisplayNameChange={setDisplayName}
            onBioChange={setBio}
            onLocationChange={setLocation}
            onPhoneChange={setPhone}
            onShowContactInfoChange={setShowContactInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;