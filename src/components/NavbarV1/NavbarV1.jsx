import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Desktop, Mobile } from '../../components';
import { About } from '../../pages/About/About';
import { FaChevronDown, FaRegWindowClose } from "react-icons/fa";
import { Squash as Hamburger } from 'hamburger-react'
import logo from '../../assets/gallerymojo..svg'
import { useMediaQuery } from 'react-responsive'
import poweredBy from '../../assets/poweredByPexels.svg'
import { getAllData, userInfo } from "../../features/user/userSlice";
import { fetchSearchPhoto, selectedCatagory, selectedOrientation } from '../../features/photo/photoSlice';
import { LogOut } from '../../pages/Logout/Logout'
import './NavbarV1.css'
import { fetchSearchVideo } from "../../features/video/videoSlice";

const NavbarV1 = () => {

  const [isOpen, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userInfo);
  console.log(user)
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
    ]
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
    // console.log(query.current.value)
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



  return (
    <>
      {toastHandler()}
      <div className='w-full h-[90px] bg-white'>
        <div className='max-w-[1500px] mx-auto px-4 flex justify-between items-center h-full'>

          {/* Logo */}
          <div className='columns-2 flex items-center'>
            <Link to='/'>
              <img className='w-[100px] lg:w-[150px] cursor-pointer' src={logo} alt="gallerymojo." />
            </Link>
            <img onClick={() => window.open('https://www.pexels.com/')} className='w-[60px] lg:w-16 ml-3 cursor-pointer' src={poweredBy} alt="powered by pexels" />
          </div>

          {/* Search Bar */}
          <Desktop searchHandler={searchHandler} error={error} />


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
              <li><Link className='remove-active-dropdown' to='/userprofile'>Your Profile</Link></li>
              <li><Link className='remove-active-dropdown' to='/' onClick={LogOut}>Logout</Link></li>
            </ul>
          </div>

          {/* Hamburger  */}
          <div>
            <Hamburger toggled={isOpen} toggle={setOpen} size={40} duration={0.5} />
          </div>

        </div>
      </div>

      {/* Search Bar Mobile */}
      <Mobile searchHandler={searchHandler} error={error} />

      {/* Navigation */}
      <div className={isOpen
        ? 'w-full h-screen bg-gray900 text-gray100 absolute top-[90px] left-0 flex justify-center text-center ease-in duration-300 z-40'
        : 'absolute top-[90px] left-[-70%] h-screen duration-700 ease-linear z-40'}>
        <ul className='mt-5 lg:mt-40'>
          {navData.data.map((nav, index) => (
            <Link
              key={index}
              to={nav.link}
              onClick={() => setOpen(!isOpen)}>
              <li className='navigation text-2xl lg:text-4xl py-5 lg:py-10'>{nav.link_name}</li>
            </Link>
          ))}
          {user.username === null ?
            <>
              <li className='navigation text-2xl lg:text-4xl py-5 lg:py-10'>Sign In</li>
            </>
            :
            <>
              <li className='navigation text-2xl lg:text-4xl py-5 lg:py-10 lg:hidden'>Username</li>
              <li className='navigation text-2xl lg:text-4xl py-5 lg:py-10 lg:hidden'>Logout</li>
            </>
          }
          <li><About /></li>
          {/* Conditional Rendering */}
        </ul>
      </div>
    </>
  )
}

export default NavbarV1