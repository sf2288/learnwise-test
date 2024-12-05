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
  queryParamName?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  delay?: number;
}

const SearchIcon = Icons['search'];
const SpinnerIcon = Icons['spinner'];

/**
 * SearchInput is a component that allows searching and provides a way to
 * control the visibility of the search input. It uses the URL search query
 * to store the search query and updates the URL when the search is changed.
 *
 * @param {Object} props
 * @param {string} [props.queryParamName=search] - Customize the query parameter name
 * @param {string} [props.placeholder=Search...] - Custom placeholder text
 * @param {string} [props.defaultValue=''] - Default value to initialize the search
 * @param {number} [props.delay=CONSTANTS.SEARCH_DELAY] - Debounce delay in ms
 * @param {(query: string) => void} [props.onSearch] - Optional callback when search is updated
 * @returns {JSX.Element} A SearchInput component
 */
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
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(
    Boolean(searchQuery) || false
  );
  const mainDivRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useClickOutside(mainDivRef, () => {
    if (!Boolean(searchQuery)) setIsSearchVisible(false);
  });

  function toggleSearch() {
    setIsSearchVisible(!isSearchVisible);
  }

  const debouncedSearch = useDebounce(search, delay);

  useEffect(() => {
    if (isSearchVisible) {
      searchInputRef.current?.focus();
    }
  }, [isSearchVisible]);

  useEffect(() => {
    if (!isPending) {
      setLoading(false);
    }
  }, [isPending]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      setLoading(true);
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
      onSearch(event.target.value);
    }
  }

  return (
    <div className="relative space-y-1" ref={mainDivRef}>
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
            autoComplete="off"
            ref={searchInputRef}
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
