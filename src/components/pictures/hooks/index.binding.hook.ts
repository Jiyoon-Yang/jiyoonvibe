"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

interface DogApiResponse {
  message: string[];
  status: string;
}

export interface UsePicturesBindingReturn {
  images: string[];
  isLoading: boolean;
  isError: boolean;
  fetchNext: () => void;
  canFetchMore: boolean;
  sentinelRef: (node: Element | null) => void;
}

const DOG_API_URL = "https://dog.ceo/api/breeds/image/random/6";

async function fetchDogImages(): Promise<DogApiResponse> {
  const res = await fetch(DOG_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch dog images");
  }
  return res.json();
}

export function usePicturesBinding(): UsePicturesBindingReturn {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["dog-images"],
    queryFn: fetchDogImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage?.message?.length ? lastPageParam + 1 : undefined,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });

  const images = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p) => p.message);
  }, [data]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const isBusyRef = useRef(false);

  useEffect(() => {
    isBusyRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      if (isBusyRef.current) return;
      if (!hasNextPage) return;
      fetchNextPage();
    },
    [fetchNextPage, hasNextPage]
  );

  const sentinelRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "0px 0px 600px 0px",
        threshold: 0,
      });
      observerRef.current.observe(node);
    },
    [handleIntersect]
  );

  const fetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const canFetchMore = !!hasNextPage && !isFetchingNextPage;

  return {
    images,
    isLoading,
    isError,
    fetchNext,
    canFetchMore,
    sentinelRef,
  };
}
