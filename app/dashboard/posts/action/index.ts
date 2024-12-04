'use server';

import { OpenAI } from 'openai';
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
          content: `Suggest 3 related blog post body based on the given title: "${title}". The body should be informative and engaging, consisting of 3-4 paragraphs. Format the response as a numbered list and without markdown or editor format.`
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
