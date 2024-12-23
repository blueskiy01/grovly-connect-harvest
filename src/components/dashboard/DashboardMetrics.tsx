import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

type UserRole = Database['public']['Enums']['user_role'];

interface DashboardMetricsProps {
  userId: string;
  role: UserRole;
}

const DashboardMetrics = ({ userId, role }: DashboardMetricsProps) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    activeListings: 0,
    savedListings: 0,
    resourcesShared: 0,
    preOrders: 0,
    impact: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
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

        // Get pre-orders count - Fixed query syntax for OR condition
        const { data: preOrdersData, error: preOrdersError } = await supabase
          .from('looking_for_offers')
          .select(`
            id,
            looking_for_requests!inner (
              user_id
            )
          `)
          .or('user_id.eq.' + userId + ',looking_for_requests.user_id.eq.' + userId);

        if (preOrdersError) {
          console.error('Error fetching pre-orders:', preOrdersError);
        }

        setMetrics(prev => ({
          ...prev,
          activeListings: listingsCount || 0,
          savedListings: savedCount || 0,
          preOrders: preOrdersData?.length || 0,
          // Mock data for now - these would need new tables/columns
          resourcesShared: 10,
          impact: 25
        }));
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleMetricClick = (type: string) => {
    navigate(`/interactions/${type}`);
  };

  const renderMetrics = () => {
    switch (role) {
      case 'farmer':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Current Listings"
              value={metrics.activeListings}
              description="Active listings on the platform"
              onClick={() => handleMetricClick('listings')}
            />
            <MetricCard
              title="Resources Shared"
              value={metrics.resourcesShared}
              unit="kg"
              description="Total resources shared"
              onClick={() => handleMetricClick('resources')}
            />
          </div>
        );
      case 'consumer':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Saved Listings"
              value={metrics.savedListings}
              description="Listings you're interested in"
              onClick={() => handleMetricClick('saved')}
            />
            <MetricCard
              title="Pre-orders Made"
              value={metrics.preOrders}
              description="Active pre-orders"
              onClick={() => handleMetricClick('preorders')}
            />
          </div>
        );
      case 'business':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="Resources Listed"
              value={metrics.activeListings}
              description="Active resource listings"
              onClick={() => handleMetricClick('listings')}
            />
            <MetricCard
              title="Impact"
              value={metrics.impact}
              unit="kg"
              description="Waste reused this month"
              onClick={() => handleMetricClick('impact')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Overview</h2>
      {renderMetrics()}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  description: string;
  onClick: () => void;
}

const MetricCard = ({ title, value, unit, description, onClick }: MetricCardProps) => (
  <Card 
    className="cursor-pointer hover:shadow-md transition-shadow"
    onClick={onClick}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default DashboardMetrics;