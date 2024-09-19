import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-white py-3 mt-auto ml-auto w-full border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <img src="/footer-image.png" alt="footer-image" className='object-cover object-center w-72 h-8'/>
        </div>
      </div>
    </footer>
  )
}

export default Footer