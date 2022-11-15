import React from 'react'
import CatagorySwiper from '../../components/CatagorySwiper/CatagorySwiper'

const Explore = () => {
    const catagories = ['Nature', 'Girls', 'Street Photos', 'Sci-fi', 'Esthetic', 'Space']

    return (
        <>
            <div className='w-full h-[70px] mt-3 lg:py-0 bg-secondary2'>
                <div className='max-w-full mx-auto flex justify-between items-center h-full border border-gray900'>
                    <button
                        className='font-rockwell tracking-wide text-base lg:text-xl font-semibold w-full h-full border-r-2 border-gray900 hover:bg-secondary3'>
                        Photos <div className="badge bg-primary1 text-gray900 border-none">12.2k</div>
                    </button>
                    <button
                        className='font-rockwell tracking-wide text-base lg:text-xl font-semibold w-full h-full hover:bg-secondary3'>
                        Videos <div className="badge bg-primary1 text-gray900 border-none">12.2k</div>
                    </button>
                </div>
            </div>
            <div className='w-full h-[70px] mt-3 lg:py-0'>
                <div className='max-w-full mx-auto flex justify-between items-center h-full'>
                    <div
                        className='flex w-[70%]'>
                        <CatagorySwiper catagories={catagories} />
                    </div>
                    <button
                        className=''>
                        Filter
                    </button>
                </div>
            </div>

        </>

    )
}

export default Explore