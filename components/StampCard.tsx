import { PackageIcon, StickyNote } from 'lucide-react'
import React from 'react'

const StampCard = ({name, date, link}: {name: string, date: string, link?: string}) => {
  return (
    <div className='flex flex-col hover:border-2 bg-[#252525] rounded-2xl py-4 px-5 justify-between gap-8 w-[200px]'>
      <StickyNote />
      <h1>{name}</h1>
      <p className='text-gray-500'>{date}</p>
    </div>
  )
}

export default StampCard