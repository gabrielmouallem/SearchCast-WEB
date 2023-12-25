import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useSearchQuery } from "./useSearchQuery";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  text: string;
}

export function useSearch() {
  const [text, setText] = useState("");
  const { handleSubmit, control } = useForm<FormValues>();

  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
    refetch,
  } = useSearchQuery(text);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    refetch();
  };

  return {
    text,
    setText,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data,
    fetchNextPage,
    control,
    handleSubmit: handleSubmit(onSubmit),
    refetch,
  };
}
