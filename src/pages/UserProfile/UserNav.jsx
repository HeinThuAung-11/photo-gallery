import React from "react"

export const UserNav = ({ setType, photoCount, videoCount }) => {

    return (
        <div className='max-w-full mx-auto mt-3 flex justify-between items-center h-[50px] border border-gray900 bg-secondary2'>
            <button
                onClick={() => setType('photo')}
                className='font-rockwell tracking-wide text-base lg:text-xl font-semibold w-full h-full border-r-2 border-gray900 hover:bg-secondary3'>
                Photos <div className="badge bg-primary1 text-gray900 border-none">{photoCount}</div>

            </button>
            <button
                onClick={() => setType('video')}
                className='font-rockwell tracking-wide text-base lg:text-xl font-semibold w-full h-full hover:bg-secondary3'>
                Videos <div className="badge bg-primary1 text-gray900 border-none">{videoCount}</div>
            </button>
        </div>
    )
}
