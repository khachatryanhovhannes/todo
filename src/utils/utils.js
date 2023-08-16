import { toast } from 'react-toastify';
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


export {showErrorMessage, showSuccesMessage}