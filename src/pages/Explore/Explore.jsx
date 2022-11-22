import React, { useState } from 'react'
import CatagorySwiper from '../../components/CatagorySwiper/CatagorySwiper'
import { FiFilter, FiSquare, FiCheckSquare } from "react-icons/fi";
import { FaAngleDown } from 'react-icons/fa';


const Explore = () => {
    
    const catagories = ['Nature', 'Girls', 'Street Photos', 'Sci-fi', 'Esthetic', 'Space', 'Travel', 'Cinematic']
    const [size, setSize] = useState('')
    const [orientation, setOrientation] = useState('')
    const [catagory, setCatagory] = useState('')
    // console.log(size)
    // console.log(orientation)
    // console.log(catagory)

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
                        <CatagorySwiper catagories={catagories} setCatagory={setCatagory} catagoryParent={catagory} />
                    </div>

                    <div className="dropdown dropdown-bottom dropdown-end mr-[10%] text-center">

                        <label tabIndex={0}>
                            <button className="font-semibold bg-primary1 hover:bg-primary2 text-gray900 font-montserrat py-2 px-4 inline-flex items-center">
                                <FiFilter className="w-4 h-4 mr-2 font-bold" />
                                <span>Filters</span>
                            </button>
                        </label>

                        <ul tabIndex={0} className="dropdown-content menu shadow bg-primary1 z-50 w-[50vw] lg:w-[200px]">

                            <div className="collapse">
                                <input type="checkbox" />
                                <div className="collapse-title text-center">
                                    <div className="flex items-start space-x-3 py-6 justify-end">
                                        <h1 className="text-gray900 font-medium leading-none">Any Sizes</h1>
                                        <FaAngleDown />
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    <div

                                        className="flex items-start space-x-3 py-6 justify-end">
                                        <button className="text-gray900 font-medium leading-none">
                                            Large
                                        </button>

                                        {size === 'large' ?
                                            <FiCheckSquare onClick={() => setSize('')} />
                                            :
                                            <FiSquare onClick={() => setSize('large')} />
                                        }

                                    </div>
                                    <div className="flex items-start space-x-3 py-6 justify-end">
                                        <button className="text-gray900 font-medium leading-none">
                                            Medium
                                        </button>
                                        {size === 'medium' ?
                                            <FiCheckSquare onClick={() => setSize('')} />
                                            :
                                            <FiSquare onClick={() => setSize('medium')} />
                                        }
                                    </div>
                                    <div className="flex items-start space-x-3 py-6 justify-end">
                                        <button className="text-gray900 font-medium leading-none">
                                            Small
                                        </button>
                                        {size === 'small' ?
                                            <FiCheckSquare onClick={() => setSize('')} />
                                            :
                                            <FiSquare onClick={() => setSize('small')} />
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="collapse">
                                <input type="checkbox" />
                                <div className="collapse-title text-center">
                                    <div className="flex items-start space-x-3 py-6 justify-end">
                                        <h1 className="text-gray900 font-medium leading-none">Any Orientations</h1>
                                        <FaAngleDown />
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    <div
                                        onClick={() => setOrientation('landscape')}
                                        className="flex items-start space-x-3 py-6 justify-end">
                                        <h1 className="text-gray900 font-medium leading-none">Landscape</h1>
                                        {orientation === 'landscape' ? <FiCheckSquare /> : <FiSquare />}
                                    </div>
                                    <div
                                        onClick={() => setOrientation('portrait')}
                                        className="flex items-start space-x-3 py-6 justify-end">
                                        <h1 className="text-gray900 font-medium leading-none">Portrait</h1>
                                        {orientation === 'portrait' ? <FiCheckSquare /> : <FiSquare />}
                                    </div>
                                </div>
                            </div>

                        </ul>
                    </div>

                </div>
            </div>
            <div>
            </div>
        </>

    )
}

export default Explore