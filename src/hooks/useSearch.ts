import { useState } from "react";
import { useSearchQuery } from "./useSearchQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryState } from "next-usequerystate";
import { flushSync } from "react-dom";
import { executeIfExists } from "@/utils";

interface FormValues {
  text: string;
}

interface SearchOptions {
  options?: { mockedText?: string };
}

export function useSearch({ options }: SearchOptions) {
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
  } = useSearchQuery(textQuery, options);

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
