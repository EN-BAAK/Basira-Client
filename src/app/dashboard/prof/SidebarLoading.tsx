import { Skeleton } from '@/components/Skeleton'
import React from 'react'

const SidebarLoading: React.FC = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className='flex flex-col justify-center items-start gap-3'>
      {skeletonRows.map((_, index) => (
        <div key={`room-skeleton-row-${index}`} className="animate-pulse flex flex-col gap-2">
            <Skeleton className="w-50 h-7 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default SidebarLoading