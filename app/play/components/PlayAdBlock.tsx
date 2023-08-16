import Image from 'next/image'
import React from 'react'

export default function PlayAdBlock() {
  return (
    <div className='h-32 relative bg-green-100 mb-5'>
      <Image 
      priority={true}
      src={"/assets/shelta-banner2.png"}
      fill
      className="object-cover object-center"
      // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt="chart"
      />
    </div>
  )
}
