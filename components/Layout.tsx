import React from 'react'

import { Navbar } from '@/components'

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className='container'>
        {children}
        <style jsx global>{`
          .container {
            margin: 2.5rem auto;
            padding: 2.5rem;
            max-width: 80rem;
            background-color: var(--container-color);
            border-radius: 1rem;
          }
        `}</style>
      </div>
    </>
  )
}