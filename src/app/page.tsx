'use client';
import { useEffect, useState, useRef } from 'react';
import {
  setSortQuery,
  setSorted,
  setIncrementalData,
} from '@/redux/features/animationsSlice';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import {
  useSortedAnimationQuery,
  useGetAnimationsByPageQuery,
} from '@/redux/services/animationsApi';
import { VscStarFull } from "react-icons/vsc";


export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const sortQuery = useAppSelector(state => state.animations.sortQuery);
  const { isLoading, data, isError, isSuccess } =
    useGetAnimationsByPageQuery(currentPage);
  const {
    isLoading: sortLoading,
    data: sortData,
    isError: sortError,
    isSuccess: sortSuccess,
  } = useSortedAnimationQuery(sortQuery);
  const [allowNextFetch, setAllowNextFetch] = useState<boolean>();
  console.log('intersecting log: ', allowNextFetch);
  const animations = useAppSelector(state => state.animations.incrementalData);
  const sortedAnimations = useAppSelector(
    state => state.animations.sortedArray,
  );
  const showSort = useAppSelector(state => state.animations.showSort);
  const dispatch = useAppDispatch();
  const myRef = useRef();

  useEffect(() => {
    if (sortData) {
      console.log('this is sort data: ', sortData)
      dispatch(setSorted(sortData.data));
    }
  }, [sortLoading, sortData]);

  useEffect(() => {
    if (data) {
      dispatch(setIncrementalData(data.data));
    }
  }, [data, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      setAllowNextFetch(entry.isIntersecting);
    });
    observer.observe(myRef.current);
  }, []);

  useEffect(() => {
    if (allowNextFetch) {
      setCurrentPage(currentPage + 1);
    }
  }, [allowNextFetch]);

  function truncate(str, length) {
    if (str.length <= length) {
      return str;
    }
  
    const words = str.split(' ');
    let truncated = '';
  
    for (let i = 0; i < words.length; i++) {
      if ((truncated + words[i]).length <= length) {
        truncated += words[i] + ' ';
      } else {
        break;
      }
    }
  
    return truncated.trim() + '...';
  }

  return showSort ? (
   
      <section className='relative overflow-hidden grid grid-cols-2 gap-4'>
        {!sortLoading && sortedAnimations.length > 0 ? (
          sortedAnimations.map((sortedObj, i) => (
            <section
              className='flex flex-col items-center h-[320px] min-h-[320px] max-h-[320px] w-[100%]'
              key={i}>
              <div className='relative overflow-hidden rounded-[25px]  w-[100%] h-[270px] min-h-[270px] max-h-[270px]'>
                <Image
                  src={sortedObj.reviewsThumbnailUrl}
                  fill={true}
                  alt={sortedObj.reviewsThumbnailUrl}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <div className='w-full flex flex-col items-between'>
                <h1 className='text-md font-bold text-[#333]'>
                  {sortedObj.reviewsTitle}
                  <div className='flex gap-2' >
                  <VscStarFull color='gold' />
                  {sortedObj.reviewsRate}
                  </div>
                </h1>
              </div>
            </section>
          ))
        ) : (
          <>
            <div
              role='status'
              className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
              <svg
                className='w-12 h-12 text-gray-200 dark:text-gray-600'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 640 512'>
                <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
            <div
              role='status'
              className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
              <svg
                className='w-12 h-12 text-gray-200 dark:text-gray-600'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 640 512'>
                <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          </>
        )}
        {!isLoading && (
          <>
            <div
              role='status'
              className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
              <svg
                className='w-12 h-12 text-gray-200 dark:text-gray-600'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 640 512'>
                <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
            <div
              role='status'
              className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
              <svg
                className='w-12 h-12 text-gray-200 dark:text-gray-600'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 640 512'>
                <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          </>
        )}

        {/* this div is hidden and for observation rtk fetch params */}
        <div ref={myRef}></div>
      </section>
    
  ) : (
    <section className='relative overflow-hidden grid grid-cols-2 gap-4'>
      {!isLoading && animations.length > 0 ? (
        animations.map((animation, i) => (
          <section
            className='flex flex-col items-center h-[320px] min-h-[320px] max-h-[320px] w-[100%]'
            key={i}>
            <div className='relative overflow-hidden rounded-[25px]  w-[100%] h-[270px] min-h-[270px] max-h-[270px]'>
              <Image
                src={animation.reviewsThumbnailUrl}
                fill={true}
                alt={animation.reviewsThumbnailUrl}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div className='w-full flex flex-col items-between'>
                <h1 className='text-md font-bold text-[#333]'>
                  {truncate(animation.reviewsTitle,20)}
                 
                  <div className='flex gap-2' >
                  <VscStarFull color='gold' />
                  {animation.reviewsRate}
                  </div>
                </h1>
              </div>
          </section>
        ))
      ) : (
        <>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          <div
            role='status'
            className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'>
            <svg
              className='w-12 h-12 text-gray-200 dark:text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'>
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </>
      )}

      {/* this div is hidden and for observation rtk fetch params */}
      <div ref={myRef}></div>
    </section>
  );
}
