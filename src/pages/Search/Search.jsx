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
    // console.log(searchPhotos)

    useEffect(() => {
        if (Object.keys(searchPhotos).length === 0) {
            navigate('/explore/photos')
        } else {
            navigate('/search')
        }
    }, [navigate, searchPhotos])

    console.log(searchPhotos)

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
                            <>No Result</>
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
                                <Loader />
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