import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

interface ListingsManagerProps {
  role: UserRole;
}

const ListingsManager = ({ role }: ListingsManagerProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {role === 'business' ? 'Manage Resources' : 'Manage Listings'}
        </h2>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          {role === 'business' ? 'Add Resource' : 'Add Listing'}
        </Button>
      </div>
      
      <div className="mt-4 rounded-lg border bg-white p-6">
        <p className="text-sm text-gray-500">
          {role === 'farmer' && "View and manage your produce listings here."}
          {role === 'consumer' && "Track your saved listings and interests."}
          {role === 'business' && "Manage your shared resources and track their impact."}
        </p>
      </div>
    </div>
  );
};

export default ListingsManager;