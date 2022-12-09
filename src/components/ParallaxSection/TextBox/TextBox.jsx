import React from 'react'
import { useMediaQuery } from 'react-responsive'

const TextBox = ({ children }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return (
        <div className='text-center bg-gray100'>
            <h2
                style={isTabletOrMobile ? { lineHeight: '2.5rem' } : { lineHeight: '4rem' }}
                className='font-montserrat text-2xl lg:text-4xl p-6 '>
                {children}
            </h2>
        </div>
    )
}

export default TextBox