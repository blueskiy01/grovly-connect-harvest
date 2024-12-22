import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type UserRole = Database['public']['Enums']['user_role'];

interface ListingsManagerProps {
  userId: string;
  role: UserRole;
}

interface Listing {
  id: string;
  title: string;
  type: string;
  category: string;
  quantity?: number;
  unit?: string;
  created_at: string;
}

const ListingsManager = ({ userId, role }: ListingsManagerProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
  }, [userId]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching listings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ status: 'deleted' })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });
      
      fetchListings();
    } catch (error: any) {
      toast({
        title: "Error deleting listing",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getListingTypeLabel = () => {
    switch (role) {
      case 'farmer':
        return 'Produce';
      case 'business':
        return 'Resource';
      default:
        return 'Listing';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage {getListingTypeLabel()}s</h2>
        <Button onClick={() => navigate('/listings/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New {getListingTypeLabel()}
        </Button>
      </div>

      <div className="grid gap-4">
        {listings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-4">
                No active {getListingTypeLabel().toLowerCase()}s found
              </p>
              <Button onClick={() => navigate('/listings/new')} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First {getListingTypeLabel()}
              </Button>
            </CardContent>
          </Card>
        ) : (
          listings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl">{listing.title}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/listings/${listing.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{listing.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{listing.category}</span>
                  </div>
                  {listing.quantity && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{listing.quantity} {listing.unit}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ListingsManager;