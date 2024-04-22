import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function ConfirmDeleteModal({ name, link, onClose, onDelete }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    axios.delete(link, { withCredentials: true })
      .then(() => {
        enqueueSnackbar(`${name} deleted successfully`, { variant: "success" });
        onClose();
        onDelete();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`${name} fail to delete`, { variant: "error" });
      });
  };

  return (
    <div 
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-w-full bg-white rounded-xl p-10 flex flex-col relative"
      >
        <p className="text-2xl text-center max-w-[500px]">Are you sure you want to delete <br /> {name}</p>
        <div className="flex gap-20 justify-center content-center mt-10">
          <button className="px-8 py-2 text-white bg-red-500 rounded-lg" onClick={onClose}>Cancel</button>
          <button className="px-8 py-2 text-white bg-green-500 rounded-lg" onClick={handleDelete}>Confirm</button>
        </div>
      </div>
    </div>
  )
}