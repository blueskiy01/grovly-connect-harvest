import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { LookingForRequest } from "@/types/looking-for";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Box } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const LookingForDetails = () => {
  const [request, setRequest] = useState<LookingForRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [offerMessage, setOfferMessage] = useState("");
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("looking_for_requests")
        .select("*, profiles(display_name)")
        .eq("id", id)
        .single();

      if (error) throw error;
      setRequest(data);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error fetching request",
        description: "Could not load the request details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOffer = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to submit an offer.",
        });
        return;
      }

      const { error } = await supabase
        .from("looking_for_offers")
        .insert({
          request_id: id,
          user_id: session.user.id,
          message: offerMessage,
        });

      if (error) throw error;

      toast({
        title: "Offer submitted",
        description: "Your offer has been sent successfully.",
      });
      setOfferMessage("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error submitting offer",
        description: "Could not submit your offer. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="pt-24 container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 w-3/4 rounded" />
            <div className="h-4 bg-gray-200 w-1/2 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div>
        <Navigation />
        <div className="pt-24 container mx-auto px-4">
          <h1 className="text-2xl font-bold">Request not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="pt-24 container mx-auto px-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{request.title}</h1>
                <p className="text-muted-foreground">
                  Posted by: {request.profiles?.display_name}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg">{request.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {request.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{request.location}</span>
                    </div>
                  )}
                  {request.quantity && request.unit && (
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span>Needed: {request.quantity} {request.unit}</span>
                    </div>
                  )}
                  {(request.start_date || request.end_date) && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {request.start_date && `From: ${new Date(request.start_date).toLocaleDateString()}`}
                        {request.end_date && ` To: ${new Date(request.end_date).toLocaleDateString()}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Submit an Offer</h2>
                <Textarea
                  placeholder="Describe how you can help..."
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSubmitOffer} disabled={!offerMessage.trim()}>
                  Submit Offer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LookingForDetails;