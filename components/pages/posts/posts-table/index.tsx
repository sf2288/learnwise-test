'use client';
import { IPost } from '@/app/dashboard/posts/types';
import CustomLink from '@/components/custom-link';
import { Icons } from '@/components/Icons';
import { useModalContext } from '@/components/modal-context';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import CardContent from '@/components/ui/card-content';
import CardDescription from '@/components/ui/card-description';
import CardFooter from '@/components/ui/card-footer';
import CardHeader from '@/components/ui/card-header';
import CardTitle from '@/components/ui/card-title';
import Table from '@/components/ui/table';
import TableBody from '@/components/ui/table/table-body';
import TableCell from '@/components/ui/table/table-cell';
import TableHeader from '@/components/ui/table/table-header';
import TableRow from '@/components/ui/table/table-row';
import {
  useCustomRouter,
  useCustomSearchParams
} from '@/hooks/use-next-navigation';
import { MODAL_TYPE, PAGES } from '@/utils/constants';
import dynamic from 'next/dynamic';
import { useEffect, useState, useTransition } from 'react';
import { POSTS_COLUMNS } from './columns';
import Label from '@/components/ui/label';

const CreatePostModal = dynamic(() => import('./create-post-modal'), {
  loading: () => null
});

const SparklesIcon = Icons['sparkles'];
const ArrowLeftIcon = Icons['arrowLeft'];
const ArrowRightIcon = Icons['arrowRight'];

/**
 * @function PostsTable
 * @description Table component for displaying a list of posts
 * @param {Object} props Component props
 * @param {number} props.total Total number of posts
 * @param {number} props.totalPages Total number of pages
 * @param {Array<IPost>} [props.filteredPosts=[]] Filtered list of posts
 * @returns {ReactElement} A table component displaying the list of posts
 */
const PostsTable = ({
  total,
  totalPages,
  filteredPosts = []
}: {
  total: number;
  totalPages: number;
  filteredPosts: Array<IPost>;
}) => {
  const searchParams = useCustomSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') as string;
  const [currentPage, setCurrentPage] = useState(page);
  const [posts, setPosts] = useState<Array<IPost>>(filteredPosts);
  const router = useCustomRouter();
  const [isPending, startTransition] = useTransition();

  const [loadingNext, setLoadingNext] = useState<boolean>(false);
  const [loadingPrev, setLoadingPrev] = useState<boolean>(false);

  const { modalData, setModalData } = useModalContext();
  const createPostModal = modalData[MODAL_TYPE.CREATE_POST_MODAL];

  useEffect(() => {
    setPosts(filteredPosts);
  }, [filteredPosts]);

  // Set loading state to false once transition is completed
  useEffect(() => {
    if (!isPending) {
      setLoadingNext(false);
      setLoadingPrev(false); // Transition completed, reset loading for both
    }
  }, [isPending]);

  useEffect(() => {
    if (currentPage !== page) {
      if (currentPage > page) {
        setLoadingNext(true); // If going forward (next)
      } else {
        setLoadingPrev(true); // If going back (previous)
      }
    }
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    } else {
      params.delete('page');
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    startTransition(() => {
      router.replace(`${window.location.pathname}?${params.toString()}`);
    });
  }, [currentPage, router, searchParams, page, searchQuery, startTransition]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle>{`Posts ${total ? `(${total})` : ''}`}</CardTitle>
            <CardDescription>
              Manage your posts and view details.
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setModalData({
                [MODAL_TYPE.CREATE_POST_MODAL]: {
                  isOpen: true,
                  title: 'Create new Post with AI',
                  onSubmitCallback: (post: IPost) => {
                    setPosts((prev) => [post, ...prev]);
                    setModalData({
                      [MODAL_TYPE.CREATE_POST_MODAL]: {
                        isOpen: false
                      }
                    });
                  }
                }
              });
            }}
          >
            <SparklesIcon className="animate-pulse" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Create Post with AI
            </span>
          </Button>
          {createPostModal?.isOpen && <CreatePostModal />}
        </div>
      </CardHeader>
      <CardContent className="relative w-full overflow-auto p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              {POSTS_COLUMNS.map((column) => (
                <TableCell key={column.label} isHeader>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts && posts.length ? (
              posts.map((post, index) => (
                <TableRow key={`${post.id}-${index}`} alternate>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {!post.isTemp ? (
                        <CustomLink
                          href={`${PAGES.DASHBOARD.POSTS.url}/${post.id}`}
                          className="line-clamp-2 w-fit text-indigo-700 underline-offset-4 hover:underline md:line-clamp-none"
                        >
                          {post.title}
                        </CustomLink>
                      ) : (
                        <Label className="inline-block">
                          {post.title}{' '}
                          <Label className="inline-block text-xs">
                            (Temporary Post)
                          </Label>
                        </Label>
                      )}
                      <span className="line-clamp-1 max-w-3xl text-sm text-muted-foreground/80">
                        {post.body}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {!post.isTemp ? (
                      <CustomLink
                        href={`${PAGES.DASHBOARD.POSTS.url}/${post.id}`}
                        className="text-blue-500"
                      >
                        <Button>View</Button>
                      </CustomLink>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex flex-col items-center gap-4">
                    No posts available!
                    <Button>Create Post</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {filteredPosts && filteredPosts.length ? (
          <CardFooter className="flex justify-center gap-4 py-6">
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="rounded p-2"
              loading={loadingPrev}
            >
              <ArrowLeftIcon className="size-4" />
              Previous
            </Button>
            <strong className="text-sm">
              Page {page} of {totalPages}
            </strong>
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded p-2"
              loading={loadingNext}
            >
              Next
              <ArrowRightIcon className="size-4" />
            </Button>
          </CardFooter>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PostsTable;
