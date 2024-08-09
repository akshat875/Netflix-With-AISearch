import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black'>
         <h1 className='text-4xl font-bold'>{title}</h1> 
         <p className='py-6 text-sm w-1/4'>{overview}</p> 
        <div className='flex space-b'>
            <button className='bg-white text-black p-2 px-5 text-lg rounded-lg flex items-center justify-center hover:bg-opacity-60'>▶Play </button>
            <button className='bg-gray-600 text-white p-2 px-5 text-lg bg-opacity-50 rounded-lg flex items-center justify-center mx-2 '> ℹ More Info</button>
        </div>

    </div>
  )
}

export default VideoTitle;