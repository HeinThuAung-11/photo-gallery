/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaChevronRight, FaRegBookmark } from "react-icons/fa";
import { useAuth } from "../../utli/Auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../utli/firebase";
import { getAllData } from "../../features/user/userSlice";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DownloadVideo = ({ vid, video }) => {
    const downloadVideo = video.video_files;
    let videoLink = downloadVideo ? downloadVideo.slice().sort((a, b) => (a.width > b.width) ? -1 :
        (a.width < b.width) ? 1 : 0).map(vd => vd.link) : null;
    const { currentUser } = useAuth();
    const [buttonDisable, setButtonDisable] = useState(false)
    const navigate = useNavigate()

    const handleAddVideo = async () => {
        if (!currentUser) {
            navigate('/login')
        }
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
            favourite_video_id: arrayUnion(vid)
        })
        toast.success('Saved To Collection!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleDownload = (url, id) => {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            toast.info('Downloading... !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(response)
            setButtonDisable(true)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${id}_from_pexel.mp4`);
            document.body.appendChild(link);
            link.click();
        })
    }
    return (
        <>
            <div className='gap-3 columns-2'>
                <div className='mx-5'>
                    <div className="dropdown dropdown-right dropdown-end w-full">
                        <label tabIndex={0} className="">
                            <button
                                className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                                <span>Free Download</span>
                                <FaChevronRight className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu p-2 drop-shadow-lg text-gray100 font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 w-52">
                                <li>
                                    <a className='remove-active-dropdown'>
                                        <button
                                            disabled={buttonDisable}
                                            onClick={() => handleDownload(videoLink[0], vid)}
                                        >
                                            Original
                                        </button>
                                    </a>
                                </li>
                                <li>
                                    <a className='remove-active-dropdown'>
                                        <button
                                            disabled={buttonDisable}
                                            onClick={() => handleDownload(videoLink[1], vid)}
                                        >
                                            Large
                                        </button>
                                    </a>
                                </li>
                                <li>
                                    <a className='remove-active-dropdown'>
                                        <button
                                            disabled={buttonDisable}
                                            onClick={() => handleDownload(videoLink[2], vid)}
                                        >
                                            Medium
                                        </button>
                                    </a>
                                </li>
                                <li>
                                    <a className='remove-active-dropdown'>
                                        <button
                                            disabled={buttonDisable}
                                            onClick={() => handleDownload(videoLink[3], vid)}
                                        >
                                            Small
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </label>
                    </div>
                </div>
                <div className='mx-5'>
                    <button
                        onClick={() => handleAddVideo()}
                        className='font-montserrat drop-shadow-lg font-semibold tracking-wider text-xs lg:text-base bg-secondary3 hover:opacity-90 text-gray100 w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                        <span>Save to Collection</span>
                        <FaRegBookmark className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                    </button>

                </div>

            </div>

        </>
    )
}