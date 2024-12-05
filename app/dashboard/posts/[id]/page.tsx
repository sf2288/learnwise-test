import { Breadcrumbs } from '@/components/breadcrumbs';
import Container from '@/components/container';
import PostDetail from '@/components/pages/post-details';
import { PAGES } from '@/utils/constants';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { GetPostByIdAction, GetUserByIdAction } from '../action';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Generates metadata for a single post.
 *
 * Retrieves the post by its ID using the {@link GetPostByIdAction} action.
 * Extracts the post title and body to set as the title and description of the metadata.
 * Also sets keywords to the words in the title and the Twitter card to the post title and body.
 * @param {Props} props - Component props
 * @param {ResolvingMetadata} parent - Parent metadata
 * @returns {Promise<Metadata>} A promise that resolves to the post metadata
 */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = Number((await params).id);
  const post = await GetPostByIdAction(id);

  return {
    title: post?.title,
    description: post?.body,
    keywords: post?.title.split(' '),
    twitter: {
      card: 'summary',
      title: post?.title,
      description: post?.body
    }
  };
}

/**
 * Page displaying a single post with its details.
 * Fetches the post and author data from the API.
 * If the post is not found, redirects to the posts page.
 * If the post is found, renders the post details component.
 */
const PostDetailsPage = async ({ params }: Props) => {
  const pageParams = await params;
  const id = Number(pageParams.id);
  if (!id) redirect(PAGES.DASHBOARD.POSTS.url);

  const post = await GetPostByIdAction(id);

  if (!post.id) {
    notFound();
  }
  const user = await GetUserByIdAction(post.userId);
  post.user = user;

  return (
    <Container className="mx-auto flex w-full max-w-4xl flex-col items-start gap-4 px-4 py-6 md:gap-6">
      <Breadcrumbs
        items={[
          { title: 'Posts', link: PAGES.DASHBOARD.POSTS.url },
          { title: post.title, link: '' }
        ]}
      />
      <PostDetail post={post} />
    </Container>
  );
};

export default PostDetailsPage;
