import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Explore from '../Explore/Explore'
import { Loader } from '../../components'
import { useSelector } from 'react-redux'
import noResultImg from '../../assets/no-result-found.svg'
import { HiOutlineHome } from "react-icons/hi";
import { fetchNextSearchPhotos, fetchSearchPhoto } from '../../features/photo/photoSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Link } from 'react-router-dom'

const Search = () => {
    const { photoLoading, searchPhotos } = useSelector((store) => store.photos)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(photoLoading)

    useEffect(() => {
      dispatch(fetchSearchPhoto())
    }, [dispatch])
    

    const noResult = () => {
        return (
            <div className='mx-auto'>
                <div className='notfound-center text-center mt-32'>
                    <img src={noResultImg} alt="notfound svg" />
                    <p className='font-montserrat font-semibold text-xl lg:text-2xl'>
                        Please try another search.
                    </p>
                    <button onClick={() => navigate('/')} className="font-montserrat py-2 px-8 lg:py-3 lg:px-9  inline-flex items-center mt-10 bg-primary1 hover:bg-primary2 shadow-[4px_4px_4px_rgba(0,0,0,0.3)] hover:shadow-none">
                        <span className='font-bold text-sm lg:text-lg'>Go Home</span>
                        <HiOutlineHome className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        )
    }


    return (
        <>
            <Explore />
            {photoLoading ?
                <div className="mt-52">
                    <Loader />
                </div>
                :
                <div className="mx-[15vw] mt-10">
                    {
                        searchPhotos.total_results === 0 ?
                            <div className='container mx-auto border-t-2 border-gray100'>
                                <div className='notfound-center text-center'>
                                    <img src={noResult} alt="notfound svg" />
                                    <button onClick={() => navigate('/')} className="font-montserrat py-2 px-8 lg:py-3 lg:px-9  inline-flex items-center bg-primary1 hover:bg-primary2 hover:shadow-[4px_4px_4px_rgba(0,0,0,0.3)]">
                                        <span className='font-bold text-sm lg:text-lg'>Go Home</span>
                                        <HiOutlineHome className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                            :
                            null
                    }
                    <InfiniteScroll
                        dataLength={20}
                        next={() => dispatch(fetchNextSearchPhotos())}
                        hasMore={true}
                        loader={<div className="overflow-hidden"><Loader /></div>}
                    >
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry gutter="20px">
                                {null}
                                {Array.isArray(searchPhotos.photos) ? (
                                    searchPhotos?.photos?.map((photo, index) => (
                                        <Link key={index} to={`/photo/detail/${photo.id}`}>
                                            <img
                                                alt="masonryPhotos"
                                                src={photo.src.large}
                                            // src={photo.download_url}
                                            />
                                        </Link>
                                    ))
                                ) : (
                                    <>
                                        {noResult()}
                                    </>
                                )}
                            </Masonry>
                        </ResponsiveMasonry>
                    </InfiniteScroll>
                </div>
            }
        </>
    )
}

export default Search