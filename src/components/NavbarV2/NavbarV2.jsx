import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/gallerymojo..svg'
import poweredBy from '../../assets/images/poweredByPexels.svg'
import { Desktop, Mobile } from '../../components'
import { FaRegWindowClose } from 'react-icons/fa'
import { fetchSearchPhoto, selectedCatagory } from '../../features/photo/photoSlice';

const NavbarV2 = () => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    const searchHandler = (e, query) => {
        e.preventDefault();
        if (query.current.value === '') {
            setError(true)
        } else {
            navigate('/search/photos')
            dispatch(selectedCatagory(query.current.value))
            dispatch(fetchSearchPhoto())
            setError(false)
        }
    }
    const toastHandler = () => {
        return (
            <>
                {error
                    ?
                    <div className="toast toast-top toast-center w-[230px] top-36 lg:top-16 z-50 ">
                        <div style={{ borderRadius: '0' }} className="alert alert-error font-bold justify-center">
                            <div>
                                <span>There is no input!</span>
                                <FaRegWindowClose onClick={() => setError(false)} className="stroke-current flex-shrink-0 h-5 w-5 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </>
        )
    }

    return (
        <>
            {toastHandler()}
            <div className='w-full h-[90px] bg-white'>
                <div className='max-w-[1500px] mx-auto px-4 flex justify-between items-center h-full'>

                    {/* Logo */}
                    <div className='columns-2 flex items-center'>
                        <img
                            onClick={() => navigate('/')}
                            className='w-[100px] lg:w-[150px] cursor-pointer'
                            src={logo}
                            alt="gallerymojo." />
                        <img
                            onClick={() => window.open('https://www.pexels.com/', '_blank')}
                            className='w-[50px] lg:w-16 ml-3 cursor-pointer'
                            src={poweredBy}
                            alt="powered by pexels" />
                    </div>

                    {/* Search Bar */}
                    <div className={
                        currentPath === '/' || currentPath === '/userprofile' || currentPath === '/about' || currentPath === '/login' || currentPath === '/register'
                            ?
                            'invisible' :
                            ''
                    }>
                        <Desktop searchHandler={searchHandler} error={error} />
                    </div>

                    {/* About  */}
                    <div>
                        <ul className='flex text-white items-center'>
                            <button
                                onClick={() => navigate('/about')}
                                className="font-rockwell font-bold text-sm lg:text-xl cursor-pointer">
                                About
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className='ml-4 font-montserrat text-sm lg:text-base font-medium bg-gradient-to-r from-[#F4D19B] to-[#78BEF4] w-[6rem] h-[2.5rem] lg:w-[9rem] lg:h-[3rem] hover:drop-shadow-lg flex items-center justify-center cursor-pointer'>
                                Join Now
                            </button>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Search Bar Mobile */}
            <div className={
                currentPath === '/' || currentPath === '/userprofile' || currentPath === '/about' || currentPath === '/login' || currentPath === '/register'
                    ? 'hidden'
                    : ''
            }>
                <Mobile
                    searchHandler={searchHandler}
                    error={error} />
            </div>
            <hr className='text-[#AAAAAA]' />

        </>
    )
}

export default NavbarV2