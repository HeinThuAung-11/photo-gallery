import React from 'react'
import logo from '../../assets/gallerymojo..svg'
import poweredBy from '../../assets/poweredByPexels.svg'

const NavbarV2 = () => {
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
                        <button className='font-rockwell font-bold text-sm lg:text-xl'>
                            About
                        </button>
                        <button className='ml-4 font-montserrat text-base font-medium bg-gradient-to-r from-[#F4D19B] to-[#78BEF4] w-[6rem] h-[3rem] lg:w-[9rem] lg:h-[3rem] hover:drop-shadow-lg'>
                            Join Now
                        </button>
                    </ul>
                </div>


            </div>
        </div>
    )
}

export default NavbarV2