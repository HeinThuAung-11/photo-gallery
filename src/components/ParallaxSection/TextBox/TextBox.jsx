import React from 'react'

const TextBox = ({ children }) => {
    return (
        <div className='text-center bg-gray100'>
            <h2 style={{ lineHeight: '4rem' }} className='font-montserrat text-3xl lg:text-4xl p-6 '>
                {children}
            </h2>
        </div>
    )
}

export default TextBox