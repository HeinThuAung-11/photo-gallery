import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/gallerymojo..svg'
import poweredBy from '../../assets/poweredByPexels.svg'
import { Desktop, Mobile } from '../../components'
import { userInfo } from '../../features/user/userSlice'
import { fetchSearchPhoto, selectedCatagory } from '../../features/photo/photoSlice';
import { About } from '../../pages/About/About'
import { Login } from '../../pages/Login/Login'
import { LogOut } from '../../pages/Logout/Logout'
import { useAuth } from "../../utli/Auth";

const NavbarV2 = () => {
    const { currentUser } = useAuth();
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const query = useRef()

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
        // console.log(query.current.value)
    }
    const toastHandler = () => {
        return (
            <>
                {error
                    ?
                    <div onClick={() => setError(false)} className="toast toast-top toast-center w-[250px] top-36 lg:top-16 z-50">
                        <div style={{ borderRadius: '0' }} className="alert alert-error font-bold">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>There is no input!</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </>
        )
    }
    // console.log("CUrrent", currentUser)
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
                    <Desktop
                        searchHandler={searchHandler}
                        error={error} />

                    {/* About  */}
                    <div>
                        <ul className='flex text-white items-center'>
                            <About />
                            {currentUser === null ? <Login /> : <LogOut />}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Search Bar Mobile */}
            <Mobile
                searchHandler={searchHandler}
                error={error} />
        </>
    )
}

export default NavbarV2