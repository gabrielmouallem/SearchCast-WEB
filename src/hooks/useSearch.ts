import { useEffect, useState } from "react";
import { useSearchQuery } from "./useSearchQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryState } from "next-usequerystate";
import { flushSync } from "react-dom";
import { executeIfExists } from "@/utils/shared";
import { OrderByValue } from "@/types";
import { normalizeTextForSearch } from "@/utils/server/normalizeTextForSearch";

interface FormValues {
  text: string;
}

export function useSearch() {
  const [orderBy, setOrderBy] = useQueryState("order_by", {
    defaultValue: "video.publishDate.desc" satisfies OrderByValue,
  });

  const [textQuery, setTextQuery] = useQueryState("text", {
    defaultValue: "",
  });
  const [text, setText] = useState(textQuery);
  const [improvedText, setImprovedText] = useState("");
  const { handleSubmit, control, setValue } = useForm<FormValues>();

  const showImprovedText = improvedText !== textQuery && !!improvedText;

  useEffect(() => {
    normalizeTextForSearch(textQuery).then((newText) =>
      setImprovedText(newText),
    );
  }, [textQuery]);

  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
  } = useSearchQuery({
    text: textQuery,
    filters: { order_by: orderBy as OrderByValue },
  });

  function handleOrderByChange(value: OrderByValue) {
    setOrderBy(value);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue("text", e.target.value);
    setText(e.target.value);
  }

  function handleSuggestionClick(value: string) {
    executeIfExists(value, (validValue) => {
      flushSync(() => {
        setTextQuery(validValue);
        setValue("text", validValue);
        setText(validValue);
      });
    });
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    executeIfExists(data.text, (validText) => {
      flushSync(() => {
        setTextQuery(validText);
      });
    });
  };

  return {
    text,
    textQuery,
    improvedText,
    showImprovedText,
    orderBy,
    handleOrderByChange,
    handleTextChange,
    handleSuggestionClick,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
}
