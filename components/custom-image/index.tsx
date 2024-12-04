'use client';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';
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
