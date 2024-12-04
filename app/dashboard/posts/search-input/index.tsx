'use client';

import { Icons } from '@/components/Icons';
import Input from '@/components/ui/input';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import {
  useCustomRouter,
  useCustomSearchParams
} from '@/hooks/use-next-navigation';
import { CONSTANTS } from '@/utils/constants';
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react';

interface SearchInputProps {
  queryParamName?: string; // Customize the query parameter name (default: "search")
  placeholder?: string; // Custom placeholder text (default: "Search...")
  defaultValue?: string; // Default value to initialize the search
  onSearch?: (query: string) => void; // Optional callback when search is updated
  delay?: number;
}

const SearchIcon = Icons['search'];
const SpinnerIcon = Icons['spinner'];

export function SearchInput({
  queryParamName = 'search',
  placeholder = 'Search...',
  defaultValue = '',
  delay = CONSTANTS.SEARCH_DELAY,
  onSearch
}: SearchInputProps) {
  const searchParams = useCustomSearchParams();
  const searchQuery = searchParams.get(queryParamName) || defaultValue;
  const router = useCustomRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState<string>(searchQuery);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state for search
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(
    Boolean(searchQuery) || false
  ); // Control search input visibility
  const searchInputRef = useRef<HTMLDivElement | null>(null); // Ref for the search input container

  // Use the custom hook to handle clicks outside the search input
  useClickOutside(searchInputRef, () => {
    if (!Boolean(searchQuery)) setIsSearchVisible(false);
  });
  // Toggle the visibility of the search input
  function toggleSearch() {
    setIsSearchVisible(!isSearchVisible);
  }
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
    params.delete('page');
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
    searchQuery
  ]);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    if (onSearch) {
      onSearch(event.target.value); // Optional callback for external handling
    }
  }

  return (
    <div className="relative space-y-1" ref={searchInputRef}>
      <SearchIcon
        className={`relative size-6 cursor-pointer text-muted-foreground ${
          isSearchVisible ? 'z-0' : 'z-50'
        } float-right`}
        onClick={toggleSearch}
      />

      {/* Search Input with transition */}
      <div
        className={`absolute left-0 top-[26%] w-full translate-y-[-26%] transition-all duration-300 ease-in-out ${
          isSearchVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative">
          <SearchIcon
            className="absolute left-2 top-1/2 size-4 -translate-y-1/2 cursor-pointer text-muted-foreground"
            onClick={toggleSearch}
          />
          <Input
            name={queryParamName}
            type="search"
            value={search}
            placeholder={placeholder}
            className="rounded-lg bg-background pl-8"
            onChange={handleSearch}
          />
          {/* Loading spinner or indication */}
          {loading && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <SpinnerIcon className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
