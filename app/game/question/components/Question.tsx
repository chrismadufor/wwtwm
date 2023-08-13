import { useAppSelector } from '@/redux/hooks'
import React from 'react'

type Props = {
  question: string,
}

export default function Question({question}: Props)
 {
  return (
    <div className="shape-wrap max-w-7xl mx-auto option-wrap">
      <div className="question bg-white flex items-center">
        <div className="question-inner flex items-center w-full h-full">
          <p className="text-3xl w-full text-center">{question}</p>
        </div>
      </div>
    </div>
  )
}
