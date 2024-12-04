'use client';

import { CreatePostAction } from '@/app/dashboard/posts/action';
import { Icons } from '@/components/Icons';
import { useModalContext } from '@/components/modal-context';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import TextArea from '@/components/ui/textarea';
import { MODAL_TYPE } from '@/utils/constants';
import { FormEvent, useState } from 'react';

const CloseIcon = Icons['close'];
const PlusIcon = Icons['add'];

export default function CreatePostModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { modalData, setModalData } = useModalContext();
  const createPostModal = modalData[MODAL_TYPE.CREATE_POST_MODAL];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setIsLoading(false);
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
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
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
          <div className="space-y-1">
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input type="text" id="title" name="title" required />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </Label>
            <TextArea
              id="body"
              name="body"
              className="w-full"
              rows={4}
              required
            ></TextArea>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded px-4 py-2 text-white"
              disabled={isLoading}
              aria-disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? (
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
