export function SearchResultItemPlaceholder() {
  return (
    <div className="!max-w-736px mx-auto flex flex-col gap-4 animate-pulse">
      {/* Placeholder for the number of moments */}
      <div className="text-xl h-6 bg-gray-300 rounded"></div>

      <div className="self-center aspect-video w-screen !max-w-736px h-full">
        {/* Placeholder for the thumbnail */}
        <div className="bg-gray-300 rounded aspect-video w-screen !max-w-736px"></div>
      </div>

      <div className="text-center">
        {/* Placeholder for the title */}
        <div className="h-6 bg-gray-300 rounded mb-2"></div>

        {/* Placeholder for the publish date and view count */}
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>

      <div
        className="bg-gray-300 rounded self-center"
        style={{ width: "295px", height: "50px" }}
      ></div>
    </div>
  );
}
