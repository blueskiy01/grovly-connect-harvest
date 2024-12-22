import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';
import type { LookingForRequest } from '@/types/looking-for';

interface LookingForCardProps {
  request: LookingForRequest;
}

export const LookingForCard = ({ request }: LookingForCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">{request.title}</h3>
          <Badge variant="secondary">
            {request.category}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{request.location || 'Location not specified'}</span>
          </div>
          {request.quantity && request.unit && (
            <div className="flex items-center gap-2">
              <span>Needed: {request.quantity} {request.unit}</span>
            </div>
          )}
          {(request.start_date || request.end_date) && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {request.start_date && `From: ${new Date(request.start_date).toLocaleDateString()}`}
                {request.end_date && ` To: ${new Date(request.end_date).toLocaleDateString()}`}
              </span>
            </div>
          )}
          <p className="mt-2 line-clamp-2">{request.description}</p>
          <div className="mt-2 text-sm text-muted-foreground">
            Posted by: {request.profiles?.display_name}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link to={`/looking-for/${request.id}`} className="w-full">
          <Button className="w-full" variant="default">
            Offer to Help
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};