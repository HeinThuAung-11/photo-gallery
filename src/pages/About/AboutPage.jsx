import React from 'react'
import './About.css'
import InfiniteMansory from '../../components/InfiniteMansory/InfiniteMansory'
import randomImage from '../../assets/mansoryGrid'

const AboutPage = () => {
    return (
        <div className='pb-10 h-[90vh] relative'>
            <div className="mx-[8vw] lg:mx-[15vw] h-[91vh] relative overflow-hidden blur-sm opacity-70">
                <InfiniteMansory staticMansory={true} datas={randomImage} />
            </div>
            <div className={'glass max-w-[656px] py-10 mx-auto rounded-md absolute m-0 mt-0 mb-10 lg:m-auto lg:mt-20 left-0 right-0 top-0'}>
                <div className="flex flex-col items-center px-10 md:px-20 lg:px-32" >
                    <h1 className="font-rockwell text-2xl font-bold my-7 tracking-wide">About</h1>
                    <ul className="font-montserrat list-outside">
                        <li className={'my-5 list-disc leading-10'}>
                            <span className={'text-[#FCAD38] font-bold font-rockwell tracking-widest'}>gallerymojo.</span> is designed and developed by <span className={'font-bold underline underline-offset-2 cursor-pointer'} onClick={() => window.open("https://github.com/ClockWize171")}>Thet Min Htin</span> and <span className={'font-bold underline underline-offset-2 cursor-pointer'} onClick={() => window.open("https://github.com/HeinThuAung-11")}>Hein Thu Aung</span> for educational purposes.
                        </li>
                        <li className={'my-5 list-disc leading-10'}>
                            <span className={'font-bold underline underline-offset-2 cursor-pointer'} onClick={() => window.open("https://tailwindcss.com/")}>TailwindCSS</span>  is used for styling and building.
                        </li>
                        <li className={'my-5 list-disc leading-10'}>
                            <span className={'font-bold underline underline-offset-2 cursor-pointer'} onClick={() => window.open("https://www.pexels.com/api/documentation/")}>Pexels API </span>is used to fetch the different sizes of photos and videos.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutPage