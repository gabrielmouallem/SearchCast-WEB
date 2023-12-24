import { SearchInput } from "@/components/SearchInput";
import { ToastContainer } from "react-toastify";
import { useSearch } from "../../hooks/useSearch";
import Image from "next/image";
import { getLastUpdate } from "@/utils";
import React, { useCallback, useMemo } from "react";
import { SearchResultItem, SearchResultItemPlaceholder } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import useBottomScroll from "@/hooks/useBottomScroll";

export function SearchEngine() {
  const {
    debouncedText,
    setText,
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearch();

  const preventPageFetching = useMemo(() => {
    return (
      (data?.pages ?? []).reduce(
        (prev, group) => prev + (group?.data?.results?.length ?? 0),
        0
      ) === data?.pages?.[0]?.data?.count
    );
  }, [data?.pages]);

  const handlePageBottomReached = useCallback(() => {
    if (preventPageFetching) return;
    if (debouncedText && debouncedText !== "") fetchNextPage();
  }, [preventPageFetching, debouncedText, fetchNextPage]);

  useBottomScroll(handlePageBottomReached);

  const hasDebouncedText = debouncedText && debouncedText !== "";
  const debouncedTextClases = hasDebouncedText
    ? "justify-start pt-20"
    : "justify-center";

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  const lastUpdate = getLastUpdate();
  const showResultItems = !((isLoading || isFetching) && !isFetchingNextPage);
  const showPlaceholders = !!(isLoading || isFetching || isFetchingNextPage);

  return (
    <>
      <ToastContainer />
      <div
        className={`flex-grow flex flex-col items-center gap-8 ${debouncedTextClases} mb-20`}
      >
        <Image src="/logo.svg" width={48} height={29.5} alt="SearchCast Logo" />
        {hasDebouncedText && (
          <div className="text-text-secondary">
            Última atualização do nosso banco de dados em:{" "}
            {lastUpdate.toLocaleDateString()} às{" "}
            {lastUpdate.toLocaleTimeString()}
          </div>
        )}
        <SearchInput onChange={handleTextChange} disabled={showPlaceholders} />
        <div className="flex flex-col items-center gap-16">
          {showResultItems &&
            (data?.pages ?? []).map((group, i) => (
              <React.Fragment key={i}>
                {group?.data &&
                  group.data.results.map((props) => {
                    return (
                      <SearchResultItem
                        key={props._id}
                        searchText={debouncedText}
                        {...props}
                      />
                    );
                  })}
              </React.Fragment>
            ))}
          {showPlaceholders &&
            new Array(10)
              .fill(0)
              .map((_, index) => (
                <SearchResultItemPlaceholder
                  key={`SearchResultItemPlaceholder_${index}`}
                />
              ))}
        </div>
      </div>
    </>
  );
}
