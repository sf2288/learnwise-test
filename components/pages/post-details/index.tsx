'use client';
import { IPost } from '@/app/dashboard/posts/types';
import CustomImage from '@/components/custom-image';
import CustomLink from '@/components/custom-link';
import { Icons } from '@/components/Icons';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useRef, useState } from 'react';

const PencilIcon = Icons['pencil'];

const PostDetail = ({ post }: { post: IPost }) => {
  const [updatedPost, setUpdatedPost] = useState<IPost>(post);
  const [title, setTitle] = useState(post.title);
  const [isEditing, setIsEditing] = useState(false);
  const titleInputRef = useRef<HTMLInputElement | null>(null); // Ref for the title input container

  // Handle clicks outside to stop editing
  useClickOutside(titleInputRef, () => {
    if (isEditing) {
      handleUpdate();
      setIsEditing(false);
    }
  });

  // Handle the title update when the Enter key is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
      setIsEditing(false); // Close editing mode
    }
  };

  const handleUpdate = () => {
    if (post) {
      setUpdatedPost({ ...post, title });
    }
  };
  const website = updatedPost?.user?.website;
  return (
    <main className="flex flex-col gap-6 md:gap-10">
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <div className="flex flex-col gap-1" ref={titleInputRef}>
            <Input
              required
              autoFocus
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Handle input change
              onBlur={() => {
                // Trigger update on blur
                handleUpdate();
                setIsEditing(false);
              }}
              onKeyDown={handleKeyDown} // Trigger update on Enter key press
            />
            <Label className="text-xs text-muted-foreground">
              <em>Press enter to update.</em>
            </Label>
          </div>
        ) : (
          <div className="group flex items-center gap-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl">
              {updatedPost.title}
            </h1>
            <Button
              className="size-10 rounded-full group-hover:visible md:invisible"
              onClick={() => setIsEditing(true)} // Start editing
            >
              <PencilIcon />
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <CustomImage
            src="https://media.istockphoto.com/id/1414734154/vector/young-smiling-man-3d-avatar-of-a-happy-guy-vector-illustration.jpg?s=612x612&w=0&k=20&c=dOoMOtJGY1fssc-Z2XqWBfnNu2-CbTJ1fwp0zJWFyqo="
            alt={updatedPost.title}
            height={40}
            width={40}
            className="rounded-full border"
          />
          <div className="flex flex-col gap-1">
            <Label>
              Posted by{' '}
              {website ? (
                <CustomLink format href={website} className="text-indigo-700">
                  {updatedPost?.user?.name}
                </CustomLink>
              ) : (
                updatedPost?.user?.name
              )}
            </Label>
            <CustomLink href={`mailto:${updatedPost?.user?.email}`}>
              <Label className="cursor-pointer text-xs text-muted-foreground">
                {updatedPost?.user?.email}
              </Label>
            </CustomLink>
          </div>
        </div>
      </div>
      <div className="relative size-full pt-[60%] md:pt-[35%]">
        <CustomImage
          src={
            'https://media.istockphoto.com/id/2150285354/photo/professional-black-female-programmer-uses-headphones-working-on-desktop-computer-focused.jpg?s=1024x1024&w=is&k=20&c=n4hab5_Y3c_J_45rgj353bS9dYGlXS2j4up2j0kU-Ls='
          }
          alt={updatedPost.title}
          className="object-contain"
          fill
        />
      </div>

      <p
        className="prose w-full !max-w-none md:prose-xl"
        dangerouslySetInnerHTML={{ __html: updatedPost.body }}
      />
    </main>
  );
};

export default PostDetail;
