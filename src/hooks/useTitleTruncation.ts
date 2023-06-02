import { useState } from 'react';

interface UseTitleTruncationOptions {
  maxLength: number;
}

interface UseTitleTruncationResult {
  truncatedTitle: string;
  toggleTruncation: () => void;
}

const useTitleTruncation = (title: string, options: UseTitleTruncationOptions): UseTitleTruncationResult => {
  const { maxLength } = options;
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated((prevState) => !prevState);
  };

  const truncatedTitle = isTruncated ? title.substring(0, maxLength) + '...' : title;

  return {
    truncatedTitle,
    toggleTruncation
  };
};

export default useTitleTruncation;
