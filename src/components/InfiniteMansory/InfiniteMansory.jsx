import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
// REDUX
import { useDispatch } from 'react-redux'
// THIRD LIBARIES
import InfiniteScroll from 'react-infinite-scroll-component'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const InfiniteMansory = ({
    datas,
    nextData,
    path,
    cssProperty,
    staticMansory }) => {

    const dispatch = useDispatch();
    

    return (
        <>
            {staticMansory ?
                <InfiniteScroll
                    dataLength={datas.length}
                    hasMore={false}
                >
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
                    >
                        <Masonry gutter="20px">
                            {
                                datas?.map((photo, index) => (
                                    <div
                                        key={index}
                                        className='mx-auto'>
                                        <LazyLoadImage
                                            className="mx-auto"
                                            effect="blur"
                                            alt="masonryPhotos"
                                            src={photo}
                                            placeholderSrc='https://via.placeholder.com/240'
                                        />
                                    </div>
                                ))
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>
                :
                <InfiniteScroll
                    dataLength={Array.isArray(datas) ? datas.length : null}
                    next={() => dispatch(nextData)}
                    hasMore={true}
                    loader={<div className="overflow-hidden"><Loader /></div>}
                >
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    >
                        <Masonry gutter="20px">
                            {Array.isArray(datas) ? (
                                datas?.map((data, index) => (
                                    <Link
                                        key={index}
                                        to={`/${path}/detail/${data.id}`}
                                        className={`mx-auto ${cssProperty}`}>
                                        <LazyLoadImage
                                            effect="blur"
                                            alt="masonryPhotos"
                                            src={data?.src?.large === undefined ? data?.image : data?.src?.large}
                                            placeholderSrc='https://via.placeholder.com/240'
                                        />
                                    </Link>
                                ))
                            ) : (
                                <Loader />
                            )}
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>
            }
        </>
    )
}

export default InfiniteMansory