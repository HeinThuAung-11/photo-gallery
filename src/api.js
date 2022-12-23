import axios from 'axios'

const pexelApi = axios.create({
    baseURL: 'https://api.pexels.com/',
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_PEXEL_API}`,
    }
})

export default pexelApi