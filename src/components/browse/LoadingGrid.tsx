import { Card, CardContent } from '@/components/ui/card';

const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="w-full h-48 bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-gray-200 w-3/4 mb-2 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 w-2/3 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoadingGrid;