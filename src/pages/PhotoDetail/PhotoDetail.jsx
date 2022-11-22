import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { DetailView } from '../../components';
import { fetchPhotoDetail } from '../../features/photo/photoSlice';

const PhotoDetail = () => {
    const { dataID } = useParams();
    const { photoDetailInfo, photoLoading } = useSelector((store) => store.photos)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPhotoDetail(dataID))
    }, [dispatch, dataID])

    // console.log(photoDetailInfo, photoLoading)

    return (
        <>
            <DetailView photoDetailInfo={photoDetailInfo} photoLoading={photoLoading} />
        </>
    )
}

export default PhotoDetail