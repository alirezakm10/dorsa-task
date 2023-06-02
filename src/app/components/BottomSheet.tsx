'use client'
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSortQuery, setShowSort } from "@/redux/features/animationsSlice";
import OutsideClickHandler from 'react-outside-click-handler';

const BottomSheet = () => {
  const dispatch = useAppDispatch()
  const {sortQuery :selectedOption, showSort} = useAppSelector(state => state.animations)
  
  

useEffect(() => {
  console.log('this is sort query: ', selectedOption)
  setSortQuery('all')
},[])
  return (
    showSort && 
    <OutsideClickHandler
    onOutsideClick={() => {
      dispatch(setShowSort())
    }}
    >
    <section className='container fixed bottom-0 h-auto pb-5 right-0 rounded-tl-[25px] rounded-tr-[25px] left-0 shadow bg-white  overflow-hidden mx-auto  sm:px-6 px-5 max-w-[480px] '>
      <div className='flex justify-center items-center h-[40px]'>
        <hr className='h-[4px] w-[80px] bg-gray-300 rounded-lg' />
      </div>

      <h1 className='text-xl text-[#333] mb-4 '>مرتب سازی بر اساس</h1>
      <div className='flex flex-col gap-3'>
        <div className='relative flex items-center'>
          <input
            type='radio'
            value=''
            name='default-radio'
            className=' relative top-[4px] w-6  h-6  text-green-600 bg-gray-100 border-gray-300 focus:ring-transparent focus:ring-2'
            checked = {selectedOption === ''}
            onChange={() => dispatch(setSortQuery(''))}
          />
          <label
            className='mr-2 text-[17px] font-medium  text-[#333]'>
             همه
          </label>
        </div>
        <div className='relative flex items-center'>
          <input
            type='radio'
            value='rate'
            name='default-radio'
            className=' relative top-[4px] w-6  h-6  text-green-600 bg-gray-100 border-gray-300 focus:ring-transparent focus:ring-2'
            checked = {selectedOption === 'rate'}
            onChange={() => dispatch(setSortQuery('rate'))}
          />
          <label
            htmlFor='default-radio-2'
            className='mr-2 text-[17px] font-medium text-[#333]'>
            بیشترین امتیاز
          </label>
        </div>
        <div className='relative flex items-center'>
          <input
            type='radio'
            value='view'
            name='default-radio'
            className=' relative top-[4px] w-6  h-6  text-green-600 bg-gray-100 border-gray-300 focus:ring-transparent focus:ring-2'
            checked = {selectedOption === 'view'}
            onChange={() => dispatch(setSortQuery('view'))}
          />
          <label
            htmlFor='default-radio-3'
            className='mr-2 text-[17px] font-medium text-[#333]'>
            بیشترین بازدید
          </label>
        </div>
        <div className='relative flex items-center'>
          <input
            type='radio'
            value='newest'
            name='default-radio'
            className=' relative top-[4px] w-6  h-6  text-green-600 bg-gray-100 border-gray-300 focus:ring-transparent focus:ring-2'
            checked = {selectedOption === 'newest'}
            onChange={() => dispatch(setSortQuery('newest'))}
          />
          <label
            htmlFor='default-radio-4'
            className='mr-2 text-[17px] font-medium text-[#333]'>
            جدیدترین
          </label>
        </div>
      </div>
    </section>
    </OutsideClickHandler>
  );
};

export default BottomSheet;
