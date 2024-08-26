"use client";
import { SearchInput } from "@/components/SearchInput";
import { ToastContainer } from "react-toastify";
import { useSearch } from "@/hooks";
import Lottie from "lottie-react";
import Image from "next/image";
import { getLastUpdate } from "@/utils/shared";
import logoLottieFile from "../../../public/logo_lottie_animation.json";
import React, { useCallback, useMemo } from "react";
import {
  SearchOrderBy,
  SearchResultItem,
  SearchResultItemPlaceholder,
} from "@/components";
import "react-toastify/dist/ReactToastify.css";
import usePageBottom from "@/hooks/usePageBottom";
import { Controller } from "react-hook-form";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingFallback } from "../LoadingFallback";
import { OrderByValue } from "@/types";
import { ORDER_BY_VALUE_TO_LABEL_MAP } from "../SearchOrderBy/SearchOrderBy.constants";
import { CopyToClipboard } from "../CopyToClipboard";

interface SearchEngineProps {
  options?: {
    mockedText?: string;
  };
}

export function SearchEngine({ options }: SearchEngineProps) {
  const isMounted = useIsMounted();

  const {
    text,
    textQuery,
    handleTextChange,
    orderBy,
    handleOrderByChange,
    handleSuggestionClick,
    isError,
    control,
    data,
    improvedText,
    showImprovedText,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    handleSubmit,
  } = useSearch({ options });

  const preventPageFetching = useMemo(() => {
    return (
      (data?.pages ?? []).reduce(
        (prev, group) => prev + (group?.data?.results?.length ?? 0),
        0,
      ) === data?.pages?.[0]?.data?.count
    );
  }, [data?.pages]);

  const handlePageBottomReached = useCallback(() => {
    if (preventPageFetching || isError || isFetching || options?.mockedText)
      return;
    if (text && text !== "") fetchNextPage();
  }, [
    preventPageFetching,
    text,
    isError,
    fetchNextPage,
    options?.mockedText,
    isFetching,
  ]);

  usePageBottom(handlePageBottomReached);

  const hasSubmittedSearch = !!data?.pages?.length || isFetching;
  const debouncedTextClases = hasSubmittedSearch
    ? `justify-start bg-tight-gradient ${!options?.mockedText ? "pt-28" : ""}`
    : "justify-center";

  const lastUpdate = getLastUpdate();
  const resultCount = data?.pages?.[0]?.data?.count;
  const showResultItems =
    !((isLoading || isFetching) && !isFetchingNextPage) && !!resultCount;
  const noResultsFound =
    !isLoading && !!data?.pages?.[0].data && !data?.pages?.[0].data?.count;

  const showPlaceholders = !!(isLoading || isFetching || isFetchingNextPage);

  const getLogoDisplayStyle = (show: boolean) => ({
    display: show ? "initial" : "none",
  });

  if (!isMounted)
    return <LoadingFallback height="[height:calc(100vh-100px)]" />;

  return (
    <>
      <div
        className={`flex flex-grow flex-col items-center gap-8 ${debouncedTextClases} pb-20`}
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
        {options?.mockedText && (
          <div className="max-w-xl text-center text-text-secondary">
            Você está no{" "}
            <span className="text-red-800">modo demonstrativo</span>. Nesta
            seção, você pode visualizar o funcionamento da plataforma. Os
            resultados são limitados a 10 itens, com dados atualizados em{" "}
            {new Date("2024-07-15T00:00:00").toLocaleDateString()} às{" "}
            {new Date("2024-07-15T00:00:00").toLocaleTimeString()}.
          </div>
        )}
        {hasSubmittedSearch && !options?.mockedText && (
          <div className="text-center text-text-secondary">
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
                title={
                  options?.mockedText &&
                  "Você não pode alterar essa pesquisa, pois está no modo demonstrativo."
                }
                value={text}
                onSuggestionClick={handleSuggestionClick}
                onChange={handleTextChange}
                disabled={showPlaceholders || !!options?.mockedText}
              />
            )}
          />
        </form>
        {!!(showResultItems && resultCount) && (
          <div className="-my-3 text-text-secondary">
            {resultCount} Resultados
          </div>
        )}
        {showPlaceholders && (
          <div className="-my-3 h-[20px] w-[300px] animate-pulse rounded bg-gray-300 text-text-secondary" />
        )}
        {showPlaceholders && (
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full max-w-[736px] items-center justify-center gap-4 sm:justify-end">
              <div
                className={`w-fit animate-pulse rounded-full border border-solid border-gray-300 bg-gray-300 px-4 py-2 text-sm text-gray-300`}
              >
                Ordenar por:
                {ORDER_BY_VALUE_TO_LABEL_MAP?.[
                  orderBy as OrderByValue
                ]?.toLowerCase() || ""}
              </div>
            </div>
          </div>
        )}
        {showResultItems && (
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full max-w-[736px] items-center justify-center gap-4 sm:justify-end">
              <SearchOrderBy
                disabled={showPlaceholders || !!options?.mockedText}
                value={
                  (orderBy as OrderByValue) ||
                  ("video.publishDate.desc" satisfies OrderByValue)
                }
                onSelect={handleOrderByChange}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-16">
          {showResultItems &&
            (data?.pages ?? []).map((group, i) => (
              <React.Fragment key={i}>
                {group?.data &&
                  group.data.results.map((props) => {
                    return (
                      <SearchResultItem
                        options={options}
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
          {(noResultsFound || isError) && (
            <div className="w-full text-center text-sm leading-loose text-text-secondary">
              <div>
                Nada encontrado.{" "}
                {showImprovedText && (
                  <>
                    Que tal pesquisar por:{" "}
                    <span className="mt-4 flex items-center justify-center gap-x-1">
                      <span className="whitespace-nowrap text-text-primary">{`"${improvedText}"`}</span>
                      <CopyToClipboard text={improvedText} />
                    </span>
                    <div className="mt-4 max-w-[300px] leading-normal">
                      <small>
                        Esta sugestão foi gerada automaticamente com base no{" "}
                        <a
                          href="https://searchcast.app/guide"
                          target="_blank"
                          className="font-bold text-text-primary underline"
                        >
                          guia de pesquisa
                        </a>{" "}
                        do SearchCast.
                      </small>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
