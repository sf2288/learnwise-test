import Container from "@/components/container";
import { SearchInput } from "./search-input";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Posts",
  description: "Posts",
};

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="size-full flex flex-col gap-4 my-6 px-4">
        <div className="flex justify-end">
          <Suspense fallback={"Loading..."}>
            <SearchInput />
          </Suspense>
        </div>
        {children}
      </div>
    </Container>
  );
}
