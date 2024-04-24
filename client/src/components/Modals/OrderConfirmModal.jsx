import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function OrderConfirmModal({ order, action, message, onClose, handleOrder }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleFunction = () => {
    if(action === "markComplete") {
      axios.put(`http://localhost:3002/order/complete/${order._id}`, {}, { withCredentials: true })
        .then((res) => {
          enqueueSnackbar('Order marked as complete', { variant: 'success' });
          handleOrder(res.data);
          onClose();
        }).catch((err) => {
          console.log(err)
          enqueueSnackbar('Fail to mark as complete', { variant: 'error' });
          onClose();
        })
    }

    if(action === "setPriority") {
      axios.put(`http://localhost:3002/order/priority/${order._id}`, {}, { withCredentials: true })
        .then((res) => {
          enqueueSnackbar('Order set as priority', { variant: 'success' });
          handleOrder(res.data)
          onClose();
        }).catch((err) => {
          console.log(err)
          enqueueSnackbar('Fail to set as priority', { variant: 'error' });
          onClose();
        })
    }
  }

  return (
    <div 
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-w-full bg-white rounded-xl p-10 flex flex-col relative"
      >
        <p className="text-2xl text-center max-w-[500px]">{message}</p>
        <div className="flex gap-20 justify-center content-center mt-10">
          <button className="px-8 py-2 text-white bg-red-500 rounded-lg" onClick={onClose}>Cancel</button>
          <button className="px-8 py-2 text-white bg-green-500 rounded-lg" onClick={handleFunction}>Confirm</button>
        </div>
      </div>
    </div>
  )
}