import React from 'react'
import { useSelector } from 'react-redux'
import logo from '../../assets/gallerymojo..svg'
import poweredBy from '../../assets/poweredByPexels.svg'
import { userInfo } from '../../features/user/userSlice'
import { About } from '../../pages/About/About'
import { Login } from '../../pages/Login/Login'
import { LogOut } from '../../pages/Logout/Logout'
import { useAuth } from "../../utli/Auth";
const NavbarV2 = () => {
    const { currentUser } = useAuth();
    // console.log("CUrrent", currentUser)
    return (
        <div className='w-full h-[90px] bg-white'>
            <div className='max-w-[1500px] mx-auto px-4 flex justify-between items-center h-full'>

                {/* Logo */}
                <div className='columns-2 flex items-center'>
                    <img className='w-[100px] lg:w-[150px] cursor-pointer' src={logo} alt="gallerymojo." />
                    <img className='w-[60px] lg:w-16 ml-3' src={poweredBy} alt="powered by pexels" />
                </div>

                {/* About  */}
                <div>
                    <ul className='flex text-white items-center'>
                        <About />
                        {currentUser === null ? <Login /> : <LogOut />}
                    </ul>
                </div>


            </div>
        </div>
    )
}

export default NavbarV2