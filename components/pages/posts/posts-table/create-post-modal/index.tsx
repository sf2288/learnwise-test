'use client';

import {
  CreatePostAction,
  GeneratePostBody
} from '@/app/dashboard/posts/action';
import { Icons } from '@/components/Icons';
import { useModalContext } from '@/components/modal-context';
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

export default function CreatePostModal() {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { modalData, setModalData } = useModalContext();
  const createPostModal = modalData[MODAL_TYPE.CREATE_POST_MODAL];
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [error, setError] = useState<string>('');

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
        userId: 2
      };
      const res = await CreatePostAction(data);

      if (typeof createPostModal.onSubmitCallback === 'function') {
        createPostModal.onSubmitCallback(res); // Use the passed callback to handle the post creation
      }
      setIsSubmitLoading(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setIsSubmitLoading(false);
    }
  };

  // This function prevents closing the modal if the click happens inside the modal content
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if the click was on the overlay (not the modal content)
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setModalData({ [MODAL_TYPE.CREATE_POST_MODAL]: { isOpen: false } });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick} // Close modal if click is on the overlay
    >
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="mb-6 text-2xl font-bold">{createPostModal?.title}</h2>
          <CloseIcon
            className="size-9 cursor-pointer rounded-full border p-2 hover:bg-muted"
            onClick={handleModalClose}
          />
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
                rows={4}
                id="body"
                name="body"
                className="w-full"
                defaultValue={body}
              />
              <Button
                type="button"
                disabled={!title}
                variant="secondary"
                onClick={generateBody}
                className="absolute right-4 top-2 z-50 size-5 bg-white p-0"
              >
                <SparklesIcon className="text-indigo-700" />
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
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded px-4 py-2 text-white"
              disabled={isSubmitLoading}
              aria-disabled={isSubmitLoading}
              loading={isSubmitLoading}
            >
              {isSubmitLoading ? (
                'Creating...'
              ) : (
                <>
                  <PlusIcon className="size-4" onClick={handleModalClose} />{' '}
                  Create Post
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
