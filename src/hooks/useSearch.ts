import { useState } from "react";
import { useSearchQuery } from "./useSearchQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryState } from "next-usequerystate";
import { flushSync } from "react-dom";
import { executeIfExists } from "@/utils/shared";
import { OrderByValue } from "@/types";
import { normalizeSearchText } from "@/utils/server/normalizeSearchText";

interface FormValues {
  text: string;
}

interface SearchOptions {
  options?: { mockedText?: string };
}

export function useSearch({ options }: SearchOptions) {
  const [orderBy, setOrderBy] = useQueryState("order_by", {
    defaultValue: "video.publishDate.desc" satisfies OrderByValue,
  });

  const [textQuery, setTextQuery] = useQueryState("text", {
    defaultValue: options?.mockedText || "",
  });
  const [text, setText] = useState(textQuery);
  const { handleSubmit, control, setValue } = useForm<FormValues>();

  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
  } = useSearchQuery(
    { text: textQuery, filters: { order_by: orderBy as OrderByValue } },
    options,
  );

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

  function handleImproveClick(value: string) {
    executeIfExists(value, (validValue) => {
      flushSync(async () => {
        const normalizedText = await normalizeSearchText(validValue);
        console.log({ validValue, normalizedText });
        setTextQuery(normalizedText);
        setValue("text", normalizedText);
        setText(normalizedText);
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
    orderBy,
    handleOrderByChange,
    handleTextChange,
    handleSuggestionClick,
    handleImproveClick,
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
