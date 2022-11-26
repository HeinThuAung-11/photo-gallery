import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { Squash as Hamburger } from 'hamburger-react'
import logo from '../../assets/gallerymojo..svg'
import poweredBy from '../../assets/poweredByPexels.svg'
import './NavbarV1.css'

const NavbarV1 = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <div className='w-full h-[90px] bg-white'>
        <div className='max-w-[1500px] mx-auto px-4 flex justify-between items-center h-full'>

          {/* Logo */}
          <div className='columns-2 flex items-center'>
            <Link to='/'>
              <img className='w-[100px] lg:w-[150px] cursor-pointer' src={logo} alt="gallerymojo." />
            </Link>
            <img className='w-[60px] lg:w-16 ml-3' src={poweredBy} alt="powered by pexels" />
          </div>

          {/* Search Bar */}
          <div className="form-control hidden lg:flex">
            <div className="input-group w-full">
              <input type="text" style={{ borderRadius: '0' }} placeholder="Search…" className="input input-bordered w-full lg:w-96" />
              <button style={{ borderRadius: '0' }} className="btn btn-square btn-outline">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* User Logo */}
          <div className="dropdown dropdown-bottom dropdown-end hidden lg:flex">
            <label className='cursor-pointer' tabIndex={0}>
              <div className="avatar flex items-center">
                <div className="w-12 rounded-full border">
                  <img src="https://avatars.dicebear.com/api/adventurer-neutral/heinthuaung.svg" alt='avater' />
                </div>
                <div className='ml-2'>
                  <FaChevronDown />
                </div>
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary2 w-52 z-50">
              <li><a href='/'>Your Profile</a></li>
              <li><a href='/'>Logout</a></li>
            </ul>
          </div>

          {/* Hamburger  */}
          <div>
            <Hamburger toggled={isOpen} toggle={setOpen} size={40} duration={0.5} />
          </div>

        </div>
      </div>

      {/* Search Bar Mobile */}
      <div className="form-control px-4 flex lg:hidden">
        <div className="input-group w-full">
          <input type="text" style={{ borderRadius: '0' }} placeholder="Search…" className="input input-bordered w-full lg:w-96" />
          <button style={{ borderRadius: '0' }} className="btn btn-square btn-outline">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className={isOpen
        ? 'w-full h-screen bg-gray900 text-gray100 absolute top-[140px] lg:top-[90px] left-0 flex justify-center text-center ease-in duration-300 z-40'
        : 'absolute top-[140px] lg:top-[90px] left-[-70%] h-screen ease-in-out duration-500'}>
        <ul className='mt-10 lg:mt-40'>
          <Link
            to='/'
            onClick={() => setOpen(!isOpen)}>
            <li className='navigation text-3xl lg:text-4xl py-10'>Home</li>
          </Link>
          <Link
            to='/explore/photos'
            onClick={() => setOpen(!isOpen)}>
            <li className='navigation text-3xl lg:text-4xl py-10'>Explore</li>
          </Link>
          <li className='navigation text-3xl lg:text-4xl py-10'>About</li>
          <li className='navigation text-3xl lg:text-4xl py-10'>Sign In</li>
          <div className="avatar flex lg:hidden items-center ">
            <div className="w-12 rounded-full border mr-4">
              <img src="https://avatars.dicebear.com/api/adventurer-neutral/heinthuaung.svg" alt='avatar' />
            </div>
            <li className='navigation text-3xl lg:text-4xl py-10 flex lg:hidden'>Username</li>
          </div>
          <li className='navigation text-3xl lg:text-4xl py-10 lg:hidden'>Logout</li>
        </ul>
      </div>
    </>
  )
}

export default NavbarV1