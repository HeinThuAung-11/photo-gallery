import React from 'react'
import './About.css'

const AboutPage = () => {
    return (
        <div className='flex px-5 lg:px-0'>
            <div className={'custom-bg-gradient max-w-[656px] py-10 mx-auto mt-10 rounded-md'}>
                <div className="flex flex-col items-center px-10 md:px-20 lg:px-32" >
                    <h1 className="font-rockwell text-2xl font-bold my-7 tracking-wide">About</h1>
                    <ul className="font-montserrat list-outside">
                        <li className={'my-5 list-disc leading-10'}><span className={'text-[#FCAD38] font-bold font-rockwell tracking-wider'}>gallerymojo.</span> is designed and developed by <span className={'font-bold underline underline-offset-2'}>Thet Min Htin</span> and <span className={'font-bold underline underline-offset-2'}>Hein Thu Aung</span> for educational purposes.</li>
                        <li className={'my-5 list-disc leading-10'}>
                            <span className={'font-bold underline underline-offset-2'}>TailwinCSS</span>  is used for styling and building.
                        </li>
                        <li className={'my-5 list-disc leading-10'}> <span className={'font-bold underline underline-offset-2'}>Pexel Api </span>is used to fetch the different sizes of photos and videos.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutPage