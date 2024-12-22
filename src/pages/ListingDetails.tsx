import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ListingHeader from "@/components/listings/ListingHeader";
import ListingDetailsContent from "@/components/listings/ListingDetailsContent";
import ListingLocationMap from "@/components/listings/ListingLocationMap";
import ListerInfo from "@/components/listings/ListerInfo";
import ListingDetailsLoading from "@/components/listings/ListingDetailsLoading";
import ListingNotFound from "@/components/listings/ListingNotFound";
import type { Listing } from "@/types/listings";

const ListingDetails = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const { data: listingData, error: listingError } = await supabase
          .from("listings")
          .select("*")
          .eq("id", id)
          .single();

        if (listingError) throw listingError;

        if (listingData) {
          setListing(listingData);
          // Fetch profile data
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", listingData.user_id)
            .single();

          if (profileError) throw profileError;
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <ListingDetailsLoading />;
  if (!listing) return <ListingNotFound />;

  return (
    <div>
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ListingHeader listing={listing} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ListingDetailsContent listing={listing} />
              <ListingLocationMap location={listing.location} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ListerInfo profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;