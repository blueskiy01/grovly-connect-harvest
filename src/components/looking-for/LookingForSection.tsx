import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LookingForCard } from './LookingForCard';
import { LookingForFilters } from './LookingForFilters';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { LookingForRequest } from '@/types/looking-for';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LookingForSection = () => {
  const [requests, setRequests] = useState<LookingForRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, [searchTerm, category, location, startDate, endDate]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('looking_for_requests')
        .select('*, profiles(display_name)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      // Apply filters
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (category) {
        query = query.eq('category', category);
      }

      if (location) {
        query = query.eq('location', location);
      }

      if (startDate) {
        query = query.gte('start_date', startDate.toISOString().split('T')[0]);
      }

      if (endDate) {
        query = query.lte('end_date', endDate.toISOString().split('T')[0]);
      }

      const { data, error } = await query;

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

      <LookingForFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {loading ? (
        <div className="text-center">Loading requests...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length > 0 ? (
            requests.map((request) => (
              <LookingForCard key={request.id} request={request} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No requests found matching your criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
};