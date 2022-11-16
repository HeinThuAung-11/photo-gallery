import React, { useEffect } from 'react'
import Explore from '../Explore/Explore'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../../features/photo/photoSlice';
import { Loader } from '../../components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const ExplorePhoto = () => {
    const { photos, loading } = useSelector((store) => store.photos)
    const dispatch = useDispatch();

    const handleScroll = (e) => {
        console.log('innerH:',window.innerHeight)
        console.log(window.innerHeight + e.target.documentElement.scrollTop + 1)
        console.log('Top:',e.target.documentElement.scrollTop)
        console.log('H:',e.target.documentElement.scrollHeight)
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
            console.log("at the bottom of the page")
        }
        if (window.innerHeight + e.target.documentElement.scrollTop <= e.target.documentElement.scrollHeight + 1){
            console.log("at the top of bottom of the page")
        }
    }

    useEffect(() => {
        dispatch(fetchPhotos())
        window.addEventListener("scroll", handleScroll)
    }, [dispatch])
    console.log(photos)

    return (
        <>
            <Explore />
            <div>
                {loading ?
                    <div className='mt-52'>
                        <Loader />
                    </div>
                    :
                    <div className='mx-[15vw] mt-10'>
                        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                            <Masonry gutter='20px'>
                                {null}
                                {photos?.photos?.map((photo, index) => (
                                    <img
                                        key={index}
                                        alt='masonryPhotos'
                                        src={photo.src.large}
                                    />
                                ))}
                            </Masonry>
                        </ResponsiveMasonry>
                    </div>
                }
            </div>
        </>
    )
}

export default ExplorePhoto