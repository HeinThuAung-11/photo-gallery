import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import CatagorySwiper from '../../components/CatagorySwiper/CatagorySwiper'
import { AmountConverter } from '../../utli/helperFunctions';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSearchPhoto,
    removeSelectedOrientation,
    selectedOrientation
} from '../../features/photo/photoSlice';
import {
    fetchSearchVideo,
    getSearchVideoResult
} from "../../features/video/videoSlice";
// THIRD PARTIES
import {
    FiFilter,
    FiSquare,
    FiCheckSquare
} from "react-icons/fi";

const Explore = () => {

    const catagories = ['Nature', 'Girls', 'Street Photos', 'Sci-fi', 'Foods', 'Space', 'Travel', 'Cinematic']
    const { searchPhotos, orientation } = useSelector((store) => store.photos)
    const searchVideoResult = useSelector(getSearchVideoResult)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    const filterHandler = (orientation) => {
        if (currentPath === '/explore/photos' || currentPath === '/search/photos') {
            navigate('/search/photos')
            dispatch(selectedOrientation(orientation))
            dispatch(fetchSearchPhoto())
        }
        if (currentPath === '/explore/videos' || currentPath === '/search/videos') {
            navigate('/search/videos')
            dispatch(selectedOrientation(orientation))
            dispatch(fetchSearchVideo())
        }
    }

    const removeFilter = () => {
        dispatch(removeSelectedOrientation())
        dispatch(fetchSearchPhoto())
    }

    return (
        <>
            <div
                className='w-full h-[70px] mt-3 lg:py-0 bg-secondary2'>
                <div className='max-w-full mx-auto flex justify-between items-center h-full border border-gray900'>
                    <button
                        onClick={() => navigate('/explore/photos')}
                        className='font-rockwell tracking-wide text-base lg:text-xl font-semibold w-full h-full border-r-2 border-gray900 hover:bg-secondary3'>
                        Photos &nbsp;
                        {Object.keys(searchPhotos).length === 0 ?
                            null
                            :
                            <div className="badge bg-primary1 text-gray900 border-none">
                                {AmountConverter(searchPhotos.total_results)}
                            </div>
                        }
                    </button>
                    <button
                        onClick={() => navigate('/explore/videos')}
                        className='font-rockwell tracking-wide text-base lg:text-xl font-semibold w-full h-full hover:bg-secondary3'>
                        Videos &nbsp;
                        <div
                            className={`badge bg-primary1 text-gray900 border-none ${searchVideoResult === undefined ? 'hidden' : ''}`}>
                            {AmountConverter(searchVideoResult)}
                        </div>

                    </button>
                </div>
            </div>
            <div className='w-full h-[70px] mt-3 lg:py-0'>
                <div className='max-w-full mx-auto flex justify-between items-center h-full'>
                    <div
                        className='flex w-[70%]'>
                        <CatagorySwiper catagories={catagories} />
                    </div>

                    <div className="dropdown dropdown-bottom dropdown-end mr-[10%] text-center text-xs lg:text-base z-10">
                        <label tabIndex={0}>
                            <button
                                className="font-semibold bg-primary1 hover:bg-primary2 text-gray900 font-montserrat py-3 px-5 inline-flex items-center">
                                <FiFilter className="w-4 h-4 mr-2 font-bold" />
                                <span>Filters</span>
                            </button>
                        </label>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu shadow bg-primary1 z-10 w-[45vw] lg:w-[13rem]">
                            <div className={`collapse collapse-arrow font-montserrat`}>
                                <input type="checkbox" />
                                <div className="collapse-title text-center font-semibold">
                                    <div className="flex items-start space-x-3 py-6 justify-end ">
                                        <h1 className="text-gray900 leading-none">Any Orientations</h1>
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    <div
                                        className="flex items-start space-x-3 py-6 justify-end">
                                        <h1 className="text-gray900 font-semibold leading-none">Landscape</h1>
                                        {orientation === 'landscape' ?
                                            <FiCheckSquare
                                                onClick={() => removeFilter()} /> :
                                            <FiSquare
                                                onClick={() => filterHandler('landscape')} />}
                                    </div>
                                    <div className="flex items-start space-x-3 py-6 justify-end">
                                        <h1 className="text-gray900 font-semibold leading-none">Portrait</h1>
                                        {orientation === 'portrait' ?
                                            <FiCheckSquare onClick={() => removeFilter()} /> :
                                            <FiSquare onClick={() => filterHandler('portrait')} />}
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