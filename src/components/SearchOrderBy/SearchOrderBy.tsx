import { OrderByValue } from "@/types";
import { FilterButton } from "../FilterButton";
import {
  ORDER_BY_OPTIONS,
  ORDER_BY_VALUE_TO_LABEL_MAP,
} from "./SearchOrderBy.constants";

interface SearchOrderByProps {
  disabled?: boolean;
  value: OrderByValue | undefined | null;
  onSelect: (value: OrderByValue) => void;
}

export function SearchOrderBy({ ...props }: SearchOrderByProps) {
  return (
    <FilterButton<OrderByValue> options={ORDER_BY_OPTIONS} {...props}>
      Ordenar por:{" "}
      <span className="font-light">
        {ORDER_BY_VALUE_TO_LABEL_MAP?.[
          props.value as OrderByValue
        ]?.toLowerCase() || ""}
      </span>
    </FilterButton>
  );
}
