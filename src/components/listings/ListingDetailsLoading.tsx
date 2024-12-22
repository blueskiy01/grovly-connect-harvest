const ListingDetailsLoading = () => {
  return (
    <div className="pt-24 container mx-auto px-4">
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-gray-200 rounded-lg" />
        <div className="h-8 bg-gray-200 w-3/4 rounded" />
        <div className="h-4 bg-gray-200 w-1/2 rounded" />
      </div>
    </div>
  );
};

export default ListingDetailsLoading;