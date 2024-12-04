import { fetcher } from "@/app/action/main-fetcher";
import { API_ROUTES, CONSTANTS } from "@/utils/constants";

export const GetPostsAction = async (
  page: number = 1,
  limit: number = CONSTANTS.PER_PAGE
) => {
  try {
    const newSearchParams = new URLSearchParams();
    if (page) newSearchParams.set("_page", page.toString());
    else newSearchParams.delete("_page");

    if (limit) newSearchParams.set("limit", limit.toString());
    else newSearchParams.delete("limit");

    const response = await fetcher({
      apiPath: `${API_ROUTES.POSTS.apiPath}?${newSearchParams.toString()}`,
    });

    const posts = response.body || [];
    return { posts };
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function GetPostAction(id: number) {
  const response = await fetcher({
    apiPath: `${API_ROUTES.POSTS.apiPath}/${id}`,
  });
  return response.body;
}
