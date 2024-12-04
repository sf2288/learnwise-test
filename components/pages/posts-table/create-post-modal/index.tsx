"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import TextArea from "@/components/ui/textarea";
import { X } from "lucide-react";
import { FormEvent } from "react";

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("title"));
    console.log(formData.get("body"));
    /* try {
      const res = await fetcher("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log("New post created:", data);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } */
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
          <X
            className="size-10 cursor-pointer border rounded-full p-2 hover:bg-muted"
            onClick={onClose}
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
              className="w-full "
              rows={4}
              required
            ></TextArea>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="text-white px-4 py-2 rounded">
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
