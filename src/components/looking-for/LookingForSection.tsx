import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LookingForCard } from './LookingForCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { LookingForRequest } from '@/types/looking-for';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LookingForSection = () => {
  const [requests, setRequests] = useState<LookingForRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('looking_for_requests')
        .select('*, profiles(display_name)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        toast({
          variant: "destructive",
          title: "Error fetching requests",
          description: error.message
        });
        return;
      }

      if (data) {
        setRequests(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Looking For Requests</h2>
        <Button onClick={() => navigate('/looking-for/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Post Request
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Loading requests...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <LookingForCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};