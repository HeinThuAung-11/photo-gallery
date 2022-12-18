import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'
import img7 from './img7.jpeg'
import img8 from './img8.jpg'
import img9 from './img9.jpg'
import img10 from './img10.jpg'

const imageData = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
let randomImage = imageData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

export default randomImage;