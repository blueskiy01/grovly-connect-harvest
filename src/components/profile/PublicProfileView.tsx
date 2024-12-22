import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Calendar, Star } from 'lucide-react';

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

  const getInitials = (name: string | null) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase()
      : '?';
  };

  if (loading) {
    return <div className="pt-20 flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!profile) {
    return <div className="pt-20 flex justify-center items-center min-h-screen">Profile not found</div>;
  }

  return (
    <div className="pt-20 max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarFallback className="text-3xl bg-primary text-white">
                {getInitials(profile.display_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-2">{profile.display_name}</h1>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-sm text-muted-foreground">(12 reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>Member since {new Date(profile.created_at).getFullYear()}</span>
              </div>
              {profile.role && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground">
                    {profile.bio || "This user hasn't added a bio yet."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Activity</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Active Listings</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">89%</div>
                      <div className="text-sm text-muted-foreground">Response Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <Separator />
                  {profile.show_contact_info ? (
                    <div className="space-y-3">
                      {profile.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Contact information is private
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;