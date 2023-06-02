'use client'
import { VscArrowRight, VscListFilter } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowSort } from "@/redux/features/animationsSlice";

const Nav = () => {
  const dispatch =useAppDispatch()
  
  return (
    <nav className='container fixed z-[1] flex flex-col top-0 h-auto right-0 left-0 shadow bg-white  overflow-hidden mx-auto  px-5 max-w-[480px] ' >
      <section className="flex gap-1 items-center text-gray-600 py-3 cursor-pointer " >
      <VscArrowRight size={24} />
      بازگشت
      </section>
      <section className="flex justify-between pb-3" >
        <div className="flex flex-col select-none " >
          <h1 className="text-lg text-[#333] font-semibold" >چیارو ببینه؟</h1>
          <p className="text-sm text-gray-600 font-normal" >مناسب برای ۳ تا ۷ سال</p>
        </div>
        <div onClick={() => dispatch(setShowSort())} className="flex gap-2 items-center text-gray-600 font-semibold cursor-pointer " >
        <VscListFilter size={24} />
        مرتب سازی
        </div>
      </section>
    </nav>
  )
}

export default Nav