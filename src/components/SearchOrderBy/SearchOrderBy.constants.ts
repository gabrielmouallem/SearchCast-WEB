import { OrderByValue } from "@/types";

export const ORDER_BY_OPTIONS = [
  {
    label: "Mais recentes",
    value: "video.publishDate.desc" as const,
  },
  {
    label: "Mais antigos",
    value: "video.publishDate.asc" as const,
  },
  {
    label: "Mais visualizados",
    value: "video.viewCount.desc" as const,
  },
  {
    label: "Menos visualizados",
    value: "video.viewCount.asc" as const,
  },
];

export const ORDER_BY_VALUE_TO_LABEL_MAP: Record<OrderByValue, string> =
  ORDER_BY_OPTIONS.reduce(
    (map, option) => {
      map[option.value] = option.label;
      return map;
    },
    {} as Record<OrderByValue, string>,
  );
