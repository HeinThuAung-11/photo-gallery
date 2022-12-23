/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
// import { LogOut } from '../../pages/Logout/Logout'
import { Desktop, Mobile } from '../../components';
import { getAuth, signOut } from "firebase/auth";
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { userInfo } from "../../features/user/userSlice";
import { fetchSearchPhoto, selectedCatagory } from '../../features/photo/photoSlice';
import { fetchSearchVideo } from "../../features/video/videoSlice";
// CSS
import './NavbarV1.css'
// IMAGE
import poweredBy from '../../assets/images/poweredByPexels.svg'
import logo from '../../assets/images/gallerymojo..svg'
// THIRD PARTIES
import { FaChevronDown, FaRegWindowClose } from "react-icons/fa";
import { Squash as Hamburger } from 'hamburger-react'
import { useMediaQuery } from 'react-responsive'

const NavbarV1 = () => {

  const [isOpen, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userInfo);
  const location = useLocation()
  const currentPath = location.pathname
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const navData = {
    "data": [
      {
        link_name: "Home",
        link: "/",
      },
      {
        link_name: "Explore",
        link: "/explore/photos",
      },
      {
        link_name: "About",
        link: '/about'
      }
    ]
  }

  const navigateCloseHandler = (link, closeSlider) => {
    navigate(link)
    setOpen(closeSlider)
  }

  const searchHandler = (e, query) => {
    e.preventDefault();
    if (query.current.value === '') {
      setError(true)
    }
    else if (currentPath === '/explore/photos' || currentPath === '/search/photos') {
      navigate('/search/photos')
      dispatch(selectedCatagory(query.current.value))
      dispatch(fetchSearchPhoto())
      setError(false)
    }
    else if (currentPath === '/explore/videos' || currentPath === '/search/videos') {
      navigate('/search/videos')
      dispatch(selectedCatagory(query.current.value))
      dispatch(fetchSearchVideo())
      setError(false)
    }
  }

  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = 'hidden';
    isTabletOrMobile ? document.body.style.paddingRight = '0px' : document.body.style.paddingRight = '6px';
  }, [isTabletOrMobile])

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = ''
  }, [])

  isOpen ? lockScroll() : unlockScroll()

  const toastHandler = () => {
    return (
      <>
        {error
          ?
          <div className="toast toast-top toast-center w-[18rem] top-36 lg:top-16 z-50 ">
            <div style={{ borderRadius: '0' }} className="alert alert-error font-bold justify-center">
              <div className='font-montserrat px-2'>
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

  const LogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Logout called')
    }).catch((error) => {
      console.log("ERROR", error)
    });
  }

  return (
    <>
      {toastHandler()}
      <div className='w-full h-[90px] bg-white'>
        <div className='max-w-[1500px] mx-auto px-4 flex justify-between items-center h-full'>

          {/* Logo */}
          <div className='columns-2 flex items-center'>
            <img onClick={() => navigate('/')} className='w-[100px] lg:w-[150px] cursor-pointer' src={logo} alt="gallerymojo." />
            <img onClick={() => window.open('https://www.pexels.com/')} className='w-[60px] lg:w-16 ml-3 cursor-pointer' src={poweredBy} alt="powered by pexels" />
          </div>

          {/* Search Bar */}
          <div className={currentPath === '/' || currentPath === '/userprofile' || currentPath === '/about' ? 'invisible' : ''}>
            <Desktop searchHandler={searchHandler} error={error} />
          </div>


          {/* User Logo */}
          <div className="dropdown dropdown-bottom dropdown-end hidden lg:flex">
            <label className='cursor-pointer' tabIndex={0}>
              <div className="avatar flex items-center">
                <div className="w-12 rounded-full border">
                  <img src={user.userPhoto} alt='avater' />
                </div>
                <div className='ml-2'>
                  <FaChevronDown />
                </div>
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary2 w-52 z-50 font-montserrat font-semibold">
              <li onClick={() => navigate('/userprofile')}>
                <a className='remove-active-dropdown' >Your Profile</a>
              </li>
              <li onClick={LogOut}>
                <a className='remove-active-dropdown' >Logout</a>
              </li>
            </ul>
          </div>

          {/* Hamburger  */}
          <div>
            <Hamburger toggled={isOpen} toggle={setOpen} size={40} duration={0.5} />
          </div>

        </div>
      </div>

      {/* Search Bar Mobile */}
      <div className={currentPath === '/' || currentPath === '/userprofile' || currentPath === '/about' ? 'hidden' : ''}>
        <Mobile
          searchHandler={searchHandler}
          error={error} />
      </div>

      {/* Navigation */}
      <div className={isOpen
        ? 'w-full h-screen bg-gray900 text-gray100 absolute top-[90px] left-0 flex justify-center text-center ease-in duration-300 z-40'
        : 'absolute top-[90px] left-[-70%] h-screen duration-700 ease-linear z-40'}>
        <ul className='mt-5 lg:mt-40'>
          {navData.data.map((nav, index) => (
            <li
              onClick={() => navigateCloseHandler(nav.link, !isOpen)}
              key={index}
              className='navigation text-2xl lg:text-4xl py-5 lg:py-10 transition-none lg:transition hover:scale-125'>
              {nav.link_name}
            </li>
          ))}
          <li
            onClick={() => navigateCloseHandler('/userprofile', !isOpen)}
            className='navigation text-2xl lg:text-4xl italic py-5 lg:py-10 lg:hidden transition-none lg:transition hover:scale-125'>
            {user.username === "" ?
              "Your Profile"
              :
              user.username
            }
          </li>
          <li className='navigation text-2xl lg:text-4xl py-5 lg:py-10 lg:hidden' onClick={LogOut}>Logout</li>
        </ul>
      </div>
    </>
  )
}

export default NavbarV1