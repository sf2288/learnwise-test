import PostsTable from "@/components/pages/posts-table";
import CreatePost from "@/components/pages/posts-table/create-post-button";
import Card from "@/components/ui/card";
import CardContent from "@/components/ui/card-content";
import CardDescription from "@/components/ui/card-description";
import CardHeader from "@/components/ui/card-header";
import CardTitle from "@/components/ui/card-title";
import { GetPostsAction } from "./action";
import { IPost } from "./types";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Posts({ searchParams }: Props) {
  const urlSearchParams = await searchParams;
  const page = Number(urlSearchParams.page) || 1;
  const { posts: fetchedPosts } = (await GetPostsAction(page)) as {
    posts: IPost[];
  };
  const search = urlSearchParams.search as string;
  const filteredPosts = search
    ? fetchedPosts.filter((post) =>
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : fetchedPosts;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle>Posts</CardTitle>
            <CardDescription>
              Manage your posts and view details.
            </CardDescription>
          </div>
          <CreatePost />
        </div>
      </CardHeader>
      <CardContent className="p-6 relative w-full overflow-auto">
        <PostsTable filteredPosts={filteredPosts} />
      </CardContent>
    </Card>
  );
}
