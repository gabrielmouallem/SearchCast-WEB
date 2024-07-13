"use client";
import { SearchInput } from "@/components/SearchInput";
import { ToastContainer } from "react-toastify";
import { useSearch } from "../../hooks/useSearch";
import Lottie from "lottie-react";
import Image from "next/image";
import { getLastUpdate } from "@/utils";
import logoLottieFile from "../../../../../public/logo_lottie_animation.json";
import React, { useCallback, useMemo } from "react";
import { SearchResultItem, SearchResultItemPlaceholder } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import useBottomScroll from "@/hooks/useBottomScroll";
import { Controller } from "react-hook-form";

export function SearchEngine() {
  const {
    text,
    textQuery,
    handleTextChange,
    handleSuggestionClick,
    control,
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    handleSubmit,
  } = useSearch();

  const preventPageFetching = useMemo(() => {
    return (
      (data?.pages ?? []).reduce(
        (prev, group) => prev + (group?.data?.results?.length ?? 0),
        0,
      ) === data?.pages?.[0]?.data?.count
    );
  }, [data?.pages]);

  const handlePageBottomReached = useCallback(() => {
    if (preventPageFetching) return;
    if (text && text !== "") fetchNextPage();
  }, [preventPageFetching, text, fetchNextPage]);

  useBottomScroll(handlePageBottomReached);

  const hasSubmittedSearch = !!data?.pages?.length || isFetching;
  const debouncedTextClases = hasSubmittedSearch
    ? "justify-start bg-tight-gradient"
    : "justify-center";

  const lastUpdate = getLastUpdate();
  const resultCount = data?.pages?.[0]?.data?.count;
  const showResultItems = !((isLoading || isFetching) && !isFetchingNextPage);
  const showPlaceholders = !!(isLoading || isFetching || isFetchingNextPage);

  const getLogoDisplayStyle = (show: boolean) => ({
    display: show ? "initial" : "none",
  });

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-grow flex-col items-center gap-8 ${debouncedTextClases} mb-20 pt-20`}
      >
        <Lottie
          style={getLogoDisplayStyle(isFetching)}
          width={48}
          height={29.5}
          animationData={logoLottieFile}
          loop
          alt="SearchCast Logo"
        />

        <Image
          style={getLogoDisplayStyle(!isFetching)}
          src="/logo.svg"
          width={48}
          height={29.5}
          alt="SearchCast Logo"
        />

        {hasSubmittedSearch && (
          <div className="text-text-secondary">
            Última atualização do nosso banco de dados em:{" "}
            {lastUpdate.toLocaleDateString()} às{" "}
            {lastUpdate.toLocaleTimeString()}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <SearchInput
                {...field}
                value={text}
                onSuggestionClick={handleSuggestionClick}
                onChange={handleTextChange}
                disabled={showPlaceholders}
              />
            )}
          />
        </form>
        {!!(showResultItems && resultCount) && (
          <div className="-my-3 text-text-secondary">
            {resultCount} Resultados
          </div>
        )}
        {!showResultItems && (
          <div className="-my-3 h-[20px] w-[300px] animate-pulse rounded bg-gray-300 text-text-secondary" />
        )}
        <div className="flex flex-col items-center gap-16">
          {showResultItems &&
            (data?.pages ?? []).map((group, i) => (
              <React.Fragment key={i}>
                {group?.data &&
                  group.data.results.map((props) => {
                    return (
                      <SearchResultItem
                        key={props._id}
                        searchText={textQuery}
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
