import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FOOD_FALLBACK =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FOOD_FALLBACK,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt || 'Food item'}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-90'} transition-opacity duration-300`}
      {...props}
    />
  );
};
