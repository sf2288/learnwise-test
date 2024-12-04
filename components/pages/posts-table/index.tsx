"use client";
import { IPost } from "@/app/dashboard/posts/types";
import CustomLink from "@/components/custom-link";
import Button from "@/components/ui/button";
import CardFooter from "@/components/ui/card-footer";
import Table from "@/components/ui/table";
import TableBody from "@/components/ui/table/table-body";
import TableCell from "@/components/ui/table/table-cell";
import TableHeader from "@/components/ui/table/table-header";
import TableRow from "@/components/ui/table/table-row";
import {
  useCustomRouter,
  useCustomSearchParams,
} from "@/hooks/use-next-navigation";
import { useEffect, useState, useTransition } from "react";
import { POSTS_COLUMNS } from "./columns";

const PostsTable = ({ filteredPosts }: { filteredPosts: Array<IPost> }) => {
  const searchParams = useCustomSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") as string;
  const [currentPage, setCurrentPage] = useState(page);
  const router = useCustomRouter();
  const [isPending, startTransition] = useTransition();

  const [loadingNext, setLoadingNext] = useState<boolean>(false); // Separate loading state for next
  const [loadingPrev, setLoadingPrev] = useState<boolean>(false); // Separate loading state for previous

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
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.replace(`${window.location.pathname}?${params.toString()}`);
    });
  }, [currentPage, router, searchParams, page, searchQuery, startTransition]);

  return (
    <>
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
          {filteredPosts && filteredPosts.length ? (
            filteredPosts.map((post) => (
              <TableRow key={post.id} alternate>
                <TableCell>{post.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <CustomLink
                      href={`/posts/${post.id}`}
                      className="text-indigo-700 md:line-clamp-none line-clamp-2"
                    >
                      {post.title}
                    </CustomLink>
                    <span className="line-clamp-1 text-sm max-w-3xl text-muted-foreground/80">
                      {post.body}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <CustomLink
                    href={`/posts/${post.id}`}
                    className="text-blue-500"
                  >
                    <Button>View</Button>
                  </CustomLink>
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
        <CardFooter className="py-6 flex justify-center gap-4">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 bg-gray-300 rounded"
            loading={loadingPrev}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 bg-gray-300 rounded"
            loading={loadingNext}
          >
            Next
          </Button>
        </CardFooter>
      ) : null}
    </>
  );
};

export default PostsTable;
