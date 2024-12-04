"use client";

import ButtonLoader from "@/components/loaders/button-loader";
import Input from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import {
  useCustomRouter,
  useCustomSearchParams,
} from "@/hooks/use-next-navigation";
import { CONSTANTS } from "@/utils/constants";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

interface SearchInputProps {
  queryParamName?: string; // Customize the query parameter name (default: "search")
  placeholder?: string; // Custom placeholder text (default: "Search...")
  defaultValue?: string; // Default value to initialize the search
  onSearch?: (query: string) => void; // Optional callback when search is updated
  delay?: number;
}

export function SearchInput({
  queryParamName = "search",
  placeholder = "Search...",
  defaultValue = "",
  delay = CONSTANTS.SEARCH_DELAY,
  onSearch,
}: SearchInputProps) {
  const searchParams = useCustomSearchParams();
  const searchQuery = searchParams.get(queryParamName) || defaultValue;
  const router = useCustomRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState<string>(searchQuery);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state for search

  // Debounced search value
  const debouncedSearch = useDebounce(search, delay);

  // Set loading state to false once transition is completed
  useEffect(() => {
    if (!isPending) {
      setLoading(false); // Transition completed, set loading to false
    }
  }, [isPending]);

  // Sync state with the URL search query
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  // Update the URL with the debounced search query
  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      setLoading(true); // Set loading to true when we start updating the search
    }
    const params = new URLSearchParams();
    params.delete("page");
    if (debouncedSearch) {
      params.set(queryParamName, debouncedSearch);
    } else {
      params.delete(queryParamName);
    }
    startTransition(() => {
      router.replace(`${window.location.pathname}?${params.toString()}`);
    });
  }, [
    debouncedSearch,
    router,
    searchParams,
    queryParamName,
    startTransition,
    searchQuery,
  ]);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    if (onSearch) {
      onSearch(event.target.value); // Optional callback for external handling
    }
  }

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        name={queryParamName}
        type="search"
        value={search}
        placeholder={placeholder}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={handleSearch}
      />
      {/* Loading spinner or indication */}
      {loading && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2">
          <ButtonLoader />
        </div>
      )}
    </div>
  );
}
