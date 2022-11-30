export const About = () => {
    return (
        <>
            <label htmlFor="about" className="font-rockwell font-bold text-sm lg:text-xl cursor-pointer">About</label>
            <input type="checkbox" id="about" className="modal-toggle" />
            <label htmlFor="about" className="modal cursor-pointer">
                <label className="modal-box relative  flex flex-col items-center px-20" htmlFor="">
                    <h1 className="text-2xl font-bold my-7">About</h1>
                    <ul className="list-outside">
                        <li className={'my-5 list-disc leading-10'}><span className={'text-[#facc15]'}>Gallerymojo.</span> is designed and developed by
                            Thet Min Htin and Hein Thu Aung for educational purposes.</li>
                        <li className={'my-5 list-disc leading-10'}>
                            <span className={'font-bold underline-offset-2'}>TailwinCSS</span>  is used for styling and building.
                        </li>
                        <li className={'my-5 list-disc leading-10'}> <span className={'font-bold underline-offset-2'}>Pexel Api </span>is used to fetch the different sizes of photos and videos.</li>
                    </ul>

                </label>
            </label>
        </>)
}