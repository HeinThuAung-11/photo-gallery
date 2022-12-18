import img1 from './img1'
import img2 from './img2'
import img3 from './img3'
import img4 from './img4'
import img5 from './img5'
import img6 from './img6'
import img7 from './img7'
import img8 from './img8'
import img9 from './img9'
import img10 from './img10'

const imageData = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
let randomImage = imageData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

export default randomImage;