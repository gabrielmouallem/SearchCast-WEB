export function SearchResultItemPlaceholder() {
  return (
    <div
      className="mx-auto flex !max-w-736px animate-pulse flex-col gap-4"
      data-testid="placeholder-container"
    >
      {/* Placeholder for the number of moments */}
      <div
        className="h-6 rounded bg-gray-300 text-xl"
        data-testid="placeholder-moments"
      ></div>

      <div
        className="aspect-video h-full w-screen !max-w-736px self-center"
        data-testid="placeholder-thumbnail-container"
      >
        {/* Placeholder for the thumbnail */}
        <div
          className="aspect-video w-screen !max-w-736px rounded bg-gray-300"
          data-testid="placeholder-thumbnail"
        ></div>
      </div>

      <div className="text-center" data-testid="placeholder-title-container">
        {/* Placeholder for the title */}
        <div
          className="mb-2 h-6 rounded bg-gray-300"
          data-testid="placeholder-title"
        ></div>

        {/* Placeholder for the publish date and view count */}
        <div
          className="h-4 rounded bg-gray-300"
          data-testid="placeholder-date-view"
        ></div>
      </div>

      <div
        className="self-center rounded bg-gray-300"
        style={{ width: "295px", height: "50px" }}
        data-testid="placeholder-action-button"
      ></div>
    </div>
  );
}
