'use client';
import { PAGES } from '@/utils/constants';
import { Fragment } from 'react';
import CustomLink from '../custom-link';
import { Icons } from '../Icons';

type BreadcrumbItemProps = {
  title: string;
  link: string;
};
const HomeIcon = Icons['home'];

export function Breadcrumbs({
  items: breadCrumbs
}: {
  items?: BreadcrumbItemProps[];
}) {
  const items = breadCrumbs || [];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <ol className="flex items-center">
        <li className="flex items-center">
          <CustomLink href={PAGES.HOME.url}>
            <HomeIcon />
          </CustomLink>
          <span className="mx-2">/</span>
        </li>
        {items.map((item, index) => (
          <Fragment key={item.title}>
            {/* If it's not the last breadcrumb item, create a link */}
            {index !== items.length - 1 ? (
              <li className="flex items-center">
                <CustomLink
                  href={item.link}
                  className="hover:text-blue-700 hover:underline hover:underline-offset-4"
                >
                  {item.title}
                </CustomLink>
                {/* Separator */}
                <span className="mx-2">/</span>
              </li>
            ) : (
              // Last breadcrumb item (current page) with no link
              <li className="line-clamp-1 text-gray-500">{item.title}</li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
