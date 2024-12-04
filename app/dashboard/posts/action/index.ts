import { fetcher } from '@/app/action/main-fetcher';
import { API_ROUTES, CONSTANTS } from '@/utils/constants';

export const GetPostsAction = async (
  page: number = 1,
  limit: number = CONSTANTS.PER_PAGE
) => {
  try {
    const newSearchParams = new URLSearchParams();
    if (page) newSearchParams.set('_page', page.toString());
    else newSearchParams.delete('_page');

    if (limit) newSearchParams.set('limit', limit.toString());
    else newSearchParams.delete('limit');

    const response = await fetcher({
      apiPath: `${API_ROUTES.POSTS.apiPath}?${newSearchParams.toString()}`
    });

    const posts = response.body || [];
    return { posts, total: Number(response.headers?.get('x-total-count')) };
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function GetPostByIdAction(id: number) {
  const response = await fetcher({
    apiPath: `${API_ROUTES.POSTS.apiPath}/${id}`
  });
  return response.body;
}

export async function CreatePostAction(data: {
  title: string;
  body: string;
  userId: number;
}) {
  const response = await fetcher({
    apiPath: API_ROUTES.POSTS.apiPath,
    method: 'POST',
    data
  });
  return response.body;
}

export async function GetUserByIdAction(id: number) {
  const response = await fetcher({
    apiPath: `${API_ROUTES.USERS.apiPath}/${id}`
  });
  return response.body;
}
