"use client";

import Button from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import CreatePostModal from "../create-post-modal";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setIsModalOpen(true)}>
        <PlusCircle className="size-4" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Create Post
        </span>
      </Button>
      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CreatePost;
