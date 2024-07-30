import { OrderByValue } from "@/types";
import { FilterButton } from "../FilterButton";

interface SearchOrderByProps {
  disabled?: boolean;
  value: OrderByValue | undefined | null;
  onSelect: (value: OrderByValue) => void;
}

const options = [
  {
    label: "Mais novo",
    value: "video.publishDate.desc" as const,
  },
  {
    label: "Menos novo",
    value: "video.publishDate.asc" as const,
  },
  {
    label: "Mais vistos",
    value: "video.viewCount.desc" as const,
  },
  {
    label: "Menos vistos",
    value: "video.viewCount.asc" as const,
  },
];

export function SearchOrderBy({ ...props }: SearchOrderByProps) {
  return (
    <FilterButton<OrderByValue> options={options} {...props}>
      Ordenar por
    </FilterButton>
  );
}
