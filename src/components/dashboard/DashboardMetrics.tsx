import { useEffect, useState } from 'react';
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
    totalInterests: 0,
    resourcesShared: 0,
    preOrders: 0,
    impact: 0
  });

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

        setMetrics(prev => ({
          ...prev,
          activeListings: listingsCount || 0,
          savedListings: savedCount || 0,
          // Mock data for now - these would need new tables/columns
          totalInterests: 30,
          resourcesShared: 10,
          preOrders: 4,
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

  const renderMetrics = () => {
    switch (role) {
      case 'farmer':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Current Listings"
              value={metrics.activeListings}
              description="Active listings on the platform"
            />
            <MetricCard
              title="Total Interests"
              value={metrics.totalInterests}
              description="People interested in your listings"
            />
            <MetricCard
              title="Resources Shared"
              value={metrics.resourcesShared}
              unit="kg"
              description="Total resources shared"
            />
          </div>
        );
      case 'consumer':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Saved Listings"
              value={metrics.savedListings}
              description="Listings you're interested in"
            />
            <MetricCard
              title="Interests Shared"
              value={2}
              description="Crops you're looking for"
            />
            <MetricCard
              title="Pre-orders Made"
              value={metrics.preOrders}
              description="Active pre-orders"
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
            />
            <MetricCard
              title="Impact"
              value={metrics.impact}
              unit="kg"
              description="Waste reused this month"
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
}

const MetricCard = ({ title, value, unit, description }: MetricCardProps) => (
  <Card>
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