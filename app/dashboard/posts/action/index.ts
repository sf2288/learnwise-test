'use server';

import { OpenAI } from 'openai';
import { fetcher } from '@/app/action/main-fetcher';
import { API_ROUTES, CONSTANTS } from '@/utils/constants';

/**
 * Fetches posts from the API using the provided page and limit.
 * @param {number} [page=1] Page number to fetch.
 * @param {number} [limit=PER_PAGE] Number of posts to fetch per page.
 * @returns {Promise<{ posts: IPost[]; total: number }>} A promise resolving to an object containing the posts and the total count.
 */
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

/**
 * Fetches a post by its ID.
 * Sends a request to the POSTS API route with the specified post ID.
 * Retrieves the post data from the response body.
 * @param {number} id - The ID of the post to be fetched.
 * @returns {Promise<any>} A promise that resolves to the post data.
 */
export async function GetPostByIdAction(id: number) {
  const response = await fetcher({
    apiPath: `${API_ROUTES.POSTS.apiPath}/${id}`
  });
  return response.body;
}

/**
 * Creates a new post.
 * @param {Object} data
 * @param {string} data.title The title of the post
 * @param {string} data.body The body of the post
 * @param {number} data.userId The ID of the user creating the post
 * @returns {Promise<Object>} The created post object
 */
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

/**
 * Fetches a user by their ID.
 * Sends a request to the USERS API route with the specified user ID.
 * Retrieves the user data from the response body.
 * @param {number} id - The ID of the user to be fetched.
 * @returns {Promise<any>} A promise that resolves to the user data.
 */
export async function GetUserByIdAction(id: number) {
  const response = await fetcher({
    apiPath: `${API_ROUTES.USERS.apiPath}/${id}`
  });
  return response.body;
}

/**
 * Generates post body content using the provided title.
 * Utilizes the OpenAI API to suggest a blog post body based on the title.
 * Sets loading state during the API call and handles any errors.
 * Returns an object with the generated content or an error message.
 * @param {string} title The title of the post
 * @returns {Promise<{error: string} | {content: string}>}
 */
export async function GeneratePostBody(title: string) {
  if (!CONSTANTS.OPENAI_API_KEY) {
    console.error('OpenAI API KEY is not set.');
    return { error: 'OpenAI API KEY is not set.' };
  }
  try {
    const openai = new OpenAI({ apiKey: CONSTANTS.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Suggest Blog post body based on the given title: "${title}". The body should be informative and engaging, 1000 character. Format the response as paragraphs and without markdown or editor format.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const generatedContent = response.choices[0].message.content;
    return { content: generatedContent };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return { error: 'Error generating content.' };
  }
}
