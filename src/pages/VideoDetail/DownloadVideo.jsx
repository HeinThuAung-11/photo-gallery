/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaChevronRight, FaRegBookmark } from "react-icons/fa";
import { useAuth } from "../../utli/Auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../utli/firebase";
import { getAllData } from "../../features/user/userSlice";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Toast from '../../components/Toast/Toast'
import { ClockLoader } from "react-spinners";

export const DownloadVideo = ({ vid, video }) => {
    const downloadVideo = video.video_files;
    let videoLink = downloadVideo ? downloadVideo.slice().sort((a, b) => (a.width > b.width) ? -1 :
        (a.width < b.width) ? 1 : 0).map(vd => vd.link) : null;
    const { currentUser } = useAuth();
    const [downloadButtonLoading, setDownloadButtonLoading] = useState()
    const [collectionButtonLoading, setcollectionButtonLoading] = useState()
    const [downloadPercent, setDownloadPercent] = useState(0)
    const navigate = useNavigate()

    const handleAddVideo = () => {
        if (!currentUser) {
            navigate('/login')
        }
        setcollectionButtonLoading(true)
        const docRef = doc(db, "users", currentUser.uid);
        setTimeout(async () => {
            await updateDoc(docRef, {
                favourite_video_id: arrayUnion(vid)
            })
            setcollectionButtonLoading(false)
            Toast('success', "Saved!", false, 2000, "top-right", <BsFillBookmarkCheckFill />)
        }, 3000);
    }

    const handleDownload = (url, id) => {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
            onDownloadProgress: function (event) {
                const percentCompelete = Math.floor((event.loaded / event.total) * 100)
                setDownloadPercent(percentCompelete)
            }
        }).then((response) => {
            setDownloadButtonLoading(true)
            setTimeout(() => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${id}_from_pexel.mp4`);
                document.body.appendChild(link);
                link.click();
                Toast('success', "Downloaded!", false, 2000, "top-right", <IoCloudDownloadSharp />)
                setDownloadButtonLoading(false)
                setDownloadPercent(0)
            }, 3000);
        })
    }
    console.log(downloadPercent)
    return (
        <>
            <div className='gap-3 columns-2'>
                <div className='mx-5'>
                    <div className="dropdown dropdown-right dropdown-end w-full">
                        <label tabIndex={0} className="">
                            {downloadButtonLoading ?
                                <button
                                    className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 px-4 inline-flex items-center justify-center hover:drop-shadow-none'>
                                    <ClockLoader
                                        color="#81a7c5"
                                        size={25}
                                    />
                                </button>
                                :
                                <>
                                    {downloadPercent === 0 ?
                                        <button
                                            className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                                            <span>Free Download</span>
                                            <FaChevronRight className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                                        </button>
                                        :
                                        <button className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                                            <span>{downloadPercent}%</span>
                                        </button>

                                    }
                                    <ul tabIndex={0} className="dropdown-content menu p-2 drop-shadow-lg text-gray100 font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 w-52">
                                        <li>
                                            <a className='remove-active-dropdown'>
                                                <button
                                                    onClick={() => handleDownload(videoLink[0], vid)}
                                                >
                                                    Original
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='remove-active-dropdown'>
                                                <button
                                                    onClick={() => handleDownload(videoLink[1], vid)}
                                                >
                                                    Large
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='remove-active-dropdown'>
                                                <button
                                                    onClick={() => handleDownload(videoLink[2], vid)}
                                                >
                                                    Medium
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='remove-active-dropdown'>
                                                <button
                                                    onClick={() => handleDownload(videoLink[3], vid)}
                                                >
                                                    Small
                                                </button>
                                            </a>
                                        </li>
                                    </ul>
                                </>
                            }
                        </label>
                    </div>
                </div>
                <div className='mx-5'>
                    <button
                        onClick={() => handleAddVideo()}
                        className='font-montserrat drop-shadow-lg font-semibold tracking-wider text-xs lg:text-base bg-secondary3 hover:opacity-90 text-gray100 w-full h-11 px-4 inline-flex items-center justify-center hover:drop-shadow-none'>
                        {collectionButtonLoading ?
                            <ClockLoader
                                color="#E2C69A"
                                size={25}
                            />
                            :
                            <>
                                <span>Save to Collection</span>
                                <FaRegBookmark className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                            </>
                        }
                    </button>

                </div>

            </div>

        </>
    )
}