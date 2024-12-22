import Navigation from '../components/Navigation';
import { ListingsSection } from '@/components/listings/ListingsSection';
import { LookingForSection } from '@/components/looking-for/LookingForSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Browse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="listings">Available Listings</TabsTrigger>
            <TabsTrigger value="looking-for">Looking For</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <ListingsSection />
          </TabsContent>

          <TabsContent value="looking-for">
            <LookingForSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Browse;