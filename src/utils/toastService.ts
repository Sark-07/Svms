import { toast, Bounce } from 'react-toastify'
export const notify = (message: string) => {
    toast.success(message);

    toast.error(message);

    toast.warn(message);

    toast.info(message);
};

export const toastConfiguration = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
}