'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ICustomImage extends ImageProps {
  src: string;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  placeholder?: 'blur' | 'empty' | `data:image/${string}` | undefined;
  sizes?: string;
  loading?: 'eager' | 'lazy' | undefined;
  className?: string;
  radius?: string;
  fill?: boolean;
  onLoad?: () => void;
}

const fallBackImage = `/common-placeholder.jpg`;

/**
 * Renders a customizable image component with optional loading effects and placeholder.
 *
 * @param {string} src - Image source URL. Defaults to a fallback image if not provided.
 * @param {string} alt - Alternative text for the image.
 * @param {number | string} [width] - Width of the image.
 * @param {number | string} [height] - Height of the image.
 * @param {string} [className] - Additional CSS classes for styling the image.
 * @param {string} [blurDataURL] - Low-quality image placeholder (LQIP) data URL. Defaults to the fallback image.
 * @param {'blur' | 'empty' | `data:image/${string}`} [placeholder] - Placeholder strategy for the image. Defaults to 'blur'.
 * @param {boolean} [fill] - If true, the image will fill its parent container.
 * @param {string} [sizes] - Sizes attribute for responsive image loading. Defaults to common breakpoints.
 * @param {object} rest - Additional properties passed to the Next.js Image component.
 */
export default function CustomImage({
  src = fallBackImage,
  alt,
  width,
  height,
  className,
  blurDataURL = fallBackImage,
  placeholder = 'blur',
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw',
  ...rest
}: ICustomImage) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      fill={fill}
      width={width}
      height={height}
      placeholder={placeholder}
      blurDataURL={src || blurDataURL}
      className={`${className} ${isLoading ? 'blur-xl grayscale' : 'blur-none'}`}
      onLoad={() => {
        setLoading(false);
      }}
      {...rest}
    />
  );
}
