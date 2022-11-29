import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Explore from '../Explore/Explore'
import { Loader } from '../../components'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Link } from 'react-router-dom'

const Search = () => {
    const { photoLoading, searchPhotos } = useSelector((store) => store.photos)
    const navigate = useNavigate()
    console.log(photoLoading)

    useEffect(() => {
        // console.log(Object.keys(searchPhotos).length)
        // if (Object.keys(searchPhotos).length === 0) {
        //     navigate('/explore/photos')
        // }
    }, [navigate, searchPhotos])


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
                            <h2 className='font-montserrat text-3xl'>
                                No Result 😥
                            </h2>
                            :
                            null
                    }
                    {/* <InfiniteScroll
              dataLength={Array.isArray(photos) ? photos.length : null}
              next={() => dispatch(fetchNextPhotos())}
              hasMore={true}
              loader={<div className="overflow-hidden"><Loader /></div>}
            > */}
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
                                <>No result</>
                            )}
                        </Masonry>
                    </ResponsiveMasonry>
                    {/* </InfiniteScroll> */}
                </div>
            }
        </>
    )
}

export default Search