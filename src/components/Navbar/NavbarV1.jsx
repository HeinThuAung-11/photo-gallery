import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Squash as Hamburger } from 'hamburger-react'
import logo from '../../assets/gallerymojo..png'
import poweredBy from '../../assets/poweredByPexels.png'

const NavbarV1 = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    // <div className='container mx-auto h-[70px] py-4'>
    //   <div className="flex justify-between">
    //     <div className='columns-1 lg:columns-2'>
    //       <img className='w-[150px] md:w-[150px] lg:w-[150px] xl:w-[150px] ' src={logo} alt="gallerymojo." />
    //       <img className='w-16' src={poweredBy} alt="powered by pexels" />
    //     </div>
    //     <div className='w-[20vw]'>
    //       <div className="form-control">
    //         <div className="input-group w-full">
    //           <input type="text" style={{ borderRadius: '0' }} placeholder="Search…" className="input input-bordered w-full " />
    //           <button style={{ borderRadius: '0' }} className="btn btn-square btn-outline">
    //             <FaSearch />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div>

    //       <div className="dropdown dropdown-bottom">
    //         <label tabIndex={0}>
    //           <div className="avatar">
    //             <div className="w-12 rounded-full border">
    //               <img src="https://avatars.dicebear.com/api/adventurer-neutral/heinthuaung.svg" alt='avater' />
    //             </div>
    //           </div>
    //         </label>
    //         <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary2 w-52">
    //           <li><a href='/'>Your Profile</a></li>
    //           <li><a href='/'>Logout</a></li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <Hamburger rounded={true} toggled={isOpen} toggle={setOpen} size={40} duration={0.8} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='w-full h-[90px] bg-white'>
      <div className='max-w-[1300px] mx-auto px-4 flex justify-between items-center h-full'>

        <div className='columns-1 lg:columns-2'>
          <img className='w-[150px] md:w-[150px] lg:w-[150px] xl:w-[150px] ' src={logo} alt="gallerymojo." />
          <img className='w-16 py-2 lg:py-0' src={poweredBy} alt="powered by pexels" />
        </div>

        <div className="form-control">
          <div className="input-group w-full">
            <input type="text" style={{ borderRadius: '0' }} placeholder="Search…" className="input input-bordered w-full lg:w-96" />
            <button style={{ borderRadius: '0' }} className="btn btn-square btn-outline">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0}>
            <div className="avatar">
              <div className="w-12 rounded-full border">
                <img src="https://avatars.dicebear.com/api/adventurer-neutral/heinthuaung.svg" alt='avater' />
              </div>
            </div>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary2 w-52">
            <li><a href='/'>Your Profile</a></li>
            <li><a href='/'>Logout</a></li>
          </ul>
        </div>

        <div>
          <Hamburger rounded={true} toggled={isOpen} toggle={setOpen} size={40} duration={0.5} />
        </div>

      </div>
    </div>
  )
}

export default NavbarV1