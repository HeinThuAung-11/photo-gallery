import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from "react-icons/hi";
import notfound from '../../assets/images/NotFound.svg'
import './NotFound.css'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='mx-auto border-t-2 border-gray100'>
            <div className='notfound-center text-center'>
                <img src={notfound} alt="notfound svg" />
                <button onClick={() => navigate('/')} className="font-montserrat py-2 px-8 lg:py-3 lg:px-9  inline-flex items-center bg-primary1 hover:bg-primary2 shadow-[4px_4px_4px_rgba(0,0,0,0.3)] hover:shadow-none">
                    <span className='font-bold text-sm lg:text-lg'>Go Home</span>
                    <HiOutlineHome className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>

    )
}

export default NotFound