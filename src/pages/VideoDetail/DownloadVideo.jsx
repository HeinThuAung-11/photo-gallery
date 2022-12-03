import {FaChevronRight, FaRegBookmark} from "react-icons/fa";


export const DownloadVideo=()=>{
    return(
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
                                        // disabled={buttonDisable}
                                        // onClick={() => handleDownload(photoDetailInfo?.src?.original, photoDetailInfo.id)}
                                    >
                                        Original
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a className='remove-active-dropdown'>
                                    <button
                                        // disabled={buttonDisable}
                                        // onClick={() => handleDownload(photoDetailInfo?.src?.large, photoDetailInfo.id)}
                                    >
                                        Large
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a className='remove-active-dropdown'>
                                    <button
                                        // disabled={buttonDisable}
                                        // onClick={() => handleDownload(photoDetailInfo?.src?.medium, photoDetailInfo.id)}
                                    >
                                        Medium
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a className='remove-active-dropdown'>
                                    <button
                                        // disabled={buttonDisable}
                                        // onClick={() => handleDownload(photoDetailInfo?.src?.small, photoDetailInfo.id)}
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
                    className='font-montserrat drop-shadow-lg font-semibold tracking-wider text-xs lg:text-base bg-secondary3 hover:opacity-90 text-gray100 w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                    <span>Save to Collection</span>
                    <FaRegBookmark className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                </button>

            </div>
        </div>
    )
}