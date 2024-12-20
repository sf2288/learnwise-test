'use client';

import {
  CreatePostAction,
  GeneratePostBody
} from '@/app/dashboard/posts/action';
import { Icons } from '@/components/Icons';
import { useModalContext } from '@/components/modal-context';
import { useToast } from '@/components/toast-context';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import TextArea from '@/components/ui/textarea';
import { MODAL_TYPE } from '@/utils/constants';
import { FormEvent, useState } from 'react';

const PlusIcon = Icons['add'];
const CloseIcon = Icons['close'];
const DotIcon = Icons['dot'];
const SparklesIcon = Icons['sparkles'];

/**
 * @function CreatePostModal
 * @description A modal component for creating a new post.
 * @param {Object} props Component props
 * @param {string} props.title The title of the modal
 * @param {Function} props.onSubmitCallback A callback function which will be called with the newly created post data after submission.
 * @returns {ReactElement} A modal component displaying a form for creating a new post.
 */
export default function CreatePostModal() {
  const { addToast } = useToast();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { modalData, setModalData } = useModalContext();
  const createPostModal = modalData[MODAL_TYPE.CREATE_POST_MODAL];
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Generates post body content using the provided title.
   * Utilizes the OpenAI API to suggest a blog post body based on the title.
   * Sets loading state during the API call and handles any errors.
   * Updates the body state with the generated content upon successful retrieval.
   */
  const generateBody = async () => {
    if (title) {
      setLoading(true);
      setError('');
      const res = await GeneratePostBody(title);
      if (res.error) {
        setError(res.error);
      }
      setBody(res.content || '');
      setLoading(false);
    }
  };
  /**
   * Handles the form submission for creating a new post.
   * Prevents the default form submission behavior.
   * Retrieves the title and body from the form data.
   * Attempts to create the post using the CreatePostAction function.
   * If successful, calls the onSubmitCallback function with the newly created post data.
   * If failed, logs the error to the console.
   * @param {FormEvent<HTMLFormElement>} event The form submission event.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitLoading(true);
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    try {
      const data = {
        title,
        body,
        userId: 2,
        isTemp: true
      };
      const res = await CreatePostAction(data);

      if (typeof createPostModal.onSubmitCallback === 'function') {
        createPostModal.onSubmitCallback(res); // Use the passed callback to handle the post creation
      }
      addToast({
        type: 'success',
        title: 'Success!',
        message: 'Post created successfully.'
      });
      setIsSubmitLoading(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setIsSubmitLoading(false);
      addToast({
        type: 'error',
        title: 'Failed!',
        message: error as string
      });
    }
  };

  // This function prevents closing the modal if the click happens inside the modal content
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if the click was on the overlay (not the modal content)
    if (e.target === e.currentTarget && !loading) {
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setModalData({ [MODAL_TYPE.CREATE_POST_MODAL]: { isOpen: false } });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const disableSubmit = isSubmitLoading || loading || !(title && body);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick} // Close modal if click is on the overlay
    >
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="mb-6 text-2xl font-bold">{createPostModal?.title}</h2>
          <Button
            onClick={handleModalClose}
            disabled={isSubmitLoading || loading}
            aria-disabled={isSubmitLoading || loading}
            className="size-9 cursor-pointer rounded-full border p-2"
          >
            <CloseIcon />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="space-y-1">
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <div className="relative">
              <Input
                required
                autoFocus
                id="title"
                type="text"
                name="title"
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </Label>

            <div className="relative">
              <TextArea
                required
                rows={10}
                id="body"
                name="body"
                className="w-full"
                value={body}
                onChange={handleBodyChange}
                disabled={loading}
              />
              <Button
                type="button"
                disabled={!title}
                variant="secondary"
                onClick={generateBody}
                className={`absolute right-5 top-2 z-50 size-6 border-0 bg-white p-0 hover:bg-white`}
                title={
                  !title
                    ? 'Write Your Post Title above and click to generate AI Content.'
                    : 'Click to generate AI Content.'
                }
              >
                <SparklesIcon
                  className={`${loading ? 'animate-pulse' : ''} text-indigo-700`}
                />
              </Button>
            </div>
            {loading ? (
              <div className="flex animate-pulse items-end gap-2">
                Generating AI Content{' '}
                <div className="flex items-center">
                  <DotIcon className="size-6 animate-pulse" />
                  <DotIcon className="size-6 animate-pulse" />
                  <DotIcon className="size-6 animate-pulse" />
                </div>
              </div>
            ) : null}
            {error ? <Label className="text-destructive">{error}</Label> : null}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={handleModalClose}
              disabled={isSubmitLoading || loading}
              aria-disabled={isSubmitLoading || loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded px-4 py-2 text-white"
              disabled={disableSubmit}
              aria-disabled={disableSubmit}
              loading={isSubmitLoading}
            >
              {isSubmitLoading ? (
                'Creating...'
              ) : (
                <>
                  <PlusIcon className="size-4" /> Create Post
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
