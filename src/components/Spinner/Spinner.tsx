export const Spinner = (
  {
    width,
    height,
    fill,
  }: { width?: number; height?: number; fill?: `#${string}` } = {
    width: 30,
    height: 30,
    fill: "#85888E",
  },
) => (
  <svg
    className="animate-spin"
    fill={fill}
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z" />
    </g>
  </svg>
);
