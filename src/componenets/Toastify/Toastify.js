import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const showSuccesMessage = () => {
    toast.success('Success !', {
        position: toast.POSITION.TOP_RIGHT
    });
};
const showErrorMessage = () => {
    toast.error("Something wrong !", {
        position: toast.POSITION.TOP_RIGHT
    })
}

export default function Toastify() {

    return (
        <div>
            <ToastContainer autoClose={1000}/>
        </div>
    );
}


export {showErrorMessage, showSuccesMessage}