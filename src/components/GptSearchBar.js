import React from 'react'

const GptSearchBar = () => {
  return (
    <div className='  pt-[6%] flex justify-center'>
        <form className=' bg-black grid grid-cols-12  w-1/2 '>
            <input type='text' className='p-4 m-4 col-span-9 rounded-lg' placeholder='What do you like to watch Today?'>
            </input>
            <button className=' col-span-3 py-2 m-4 px-4 bg-red-700 text-white rounded-lg'>Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar