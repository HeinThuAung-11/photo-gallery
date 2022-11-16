import React from 'react'
import { PacmanLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='flex h-full justify-center items-center'>
            <PacmanLoader
                color='#DFC08F'
            />
        </div>
    )
}

export default Loader