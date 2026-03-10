import Image from 'next/image'
import React from 'react'
import propertylisting from "../../public/createpropertylisting.svg"
import seekerlisting from "../../public/createseekerlisting.svg"

type CreateFreeListingProps = {
  setMode: (mode: "flatmate" | "place") => void;
};


const CreateFreeListing = ({ setMode }: CreateFreeListingProps) => {
  return (
      <div className='max-w-screen-2xl mx-auto px-5 py-5 '>
          <div className='flex flex-col lg:flex-row items-center gap-7.5 w-full'>
              
          <div className='flex items-center gap-3 lg:gap-6.5 bg-white w-full lg:w-1/2 rounded-[10px]'>
                  <Image src={propertylisting} alt='propertylisting' className='size-1/2 lg:size-auto'/>   
                  <div className='flex flex-col items-center gap-4 lg:gap-10'>
        <p className='text-black font-semibold text-xl lg:text-[32px] lg:max-w-[285px]'>Create a free property listing</p>
                      <button
                          onClick={() => setMode("flatmate")}
                          className='text-white font-semibold text-sm lg:text-base bg-[#0284C7] p-1 lg:p-2 rounded-[10px]'>I need a flatmate</button>
                  </div>         
          </div>
          <div className='flex items-center gap-3 lg:gap-6.5 bg-white w-full lg:w-1/2 rounded-[10px]'>
         <Image src={seekerlisting} alt='seekerlisting' className='size-1/2 lg:size-auto'/>      
        <div className='flex flex-col items-center gap-4 lg:gap-10'>
        <p className='text-black font-semibold text-xl lg:text-[32px] lg:max-w-[285px]'>Create a free seeker listing</p>
                      <button
                     onClick={() => setMode("place")}
                          className='text-white font-semibold text-base bg-[#0284C7] p-2 rounded-[10px]'>I need a place</button>
                  </div>  
                  </div>
          </div>
    </div>
  )
}

export default CreateFreeListing