import img1 from './pexels-david-bartus-586687.jpg'
import img2 from './pexels-disha-sheta-3584430.jpg'
import img3 from './pexels-elena-rubtsova-14769376.jpg'
import img4 from './pexels-julia-sakelli-1011302.jpg'
import img5 from './pexels-oleksandr-pidvalnyi-345522.jpg'
import img6 from './pexels-peng-liu-169677.jpg'
import img7 from './pexels-photo-1701392.jpeg'
import img8 from './pexels-reign-martinez-11805639.jpg'
import img9 from './pexels-soubhagya-maharana-5245865.jpg'
import img10 from './pexels-wendy-wei-14430249.jpg'

const imageData = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
let randomImage = imageData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
export default randomImage;