import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css'

export default function notiPopup(
    type,
    message,
    progressHide,
    autoClose,
    position) {

    function getTypeClass() {
        switch (true) {
            case (type === 'success'):
                return 'success'
            case (type === 'warning'):
                return 'warning'
            case (type === 'error'):
                return 'error'
            default:
                return 'bg-primary text-white'
        }
    }

    const toastHandler = () =>
        toast(message,
            {
                position: position ? position : 'top-center',
                hideProgressBar: progressHide ? progressHide : false,
                autoClose: autoClose ? autoClose : 1000,
                className: getTypeClass()
            })

    if (message && message !== "") {
        toastHandler()
    }

}