import Container from '@/components/container';
import PostsTable from '@/components/pages/posts/posts-table';
import { CONSTANTS } from '@/utils/constants';
import { Suspense } from 'react';
import { GetPostsAction } from './action';
import { SearchInput } from './search-input';
import { IPost } from './types';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata = {
  title: 'Posts',
  description: 'Posts',
  twitter: {
    card: 'summary',
    title: 'Posts',
    description: 'Posts'
  }
};

/**
 * Fetches and displays a list of posts with pagination and search functionality.
 *
 * The function retrieves posts data based on the current page and search parameters.
 * It calculates the total number of pages and filters posts by title if a search query is present.
 *
 * @param {Object} props - Component properties
 * @param {Promise<{ [key: string]: string | string[] | undefined }>} props.searchParams - Promise resolving to search parameters from the URL
 *
 * @returns {JSX.Element} A container component with search input and a table displaying the filtered posts.
 */
export default async function Posts({ searchParams }: Props) {
  const urlSearchParams = await searchParams;
  const page = Number(urlSearchParams.page) || 1;
  const { posts: fetchedPosts, total } = (await GetPostsAction(page)) as {
    posts: IPost[];
    total: number;
  };

  const totalPages = Math.ceil(total / CONSTANTS.PER_PAGE);

  const search = urlSearchParams.search as string;
  const filteredPosts = search
    ? fetchedPosts.filter((post) =>
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : fetchedPosts;

  return (
    <Container>
      <div className="my-6 flex size-full flex-col gap-4 px-4">
        <div className="flex justify-end">
          <Suspense fallback={'Loading...'}>
            <div className="w-full max-w-lg">
              <SearchInput placeholder="Search by title..." />
            </div>
          </Suspense>
        </div>

        <PostsTable
          total={total}
          totalPages={totalPages}
          filteredPosts={filteredPosts}
        />
      </div>
    </Container>
  );
}
