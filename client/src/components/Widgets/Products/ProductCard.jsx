import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConfirmDeleteMoadal from '../../Modals/ConfirmDeleteModal';

export default function ProductCard({ item, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const deleteLink = `http://localhost:3002/items/${item._id}`;

  const handleDelete = () => {
    setShowModal(false);
    onDelete(item._id);
  };

  return (
    <div className='w-96 p-4 border rounded-lg'>
      <p className="text-green-500 text-lg mb-2">{item._id}</p>
      <div className="flex gap-8">
        <img src={`http://localhost:3002/assets/${item.imagePaths[0]}`} alt={item.name} className='shadow-sm col-span-1' height={125} width={125}/>
        <div className='w-[70%]'>
          <p className="capitalize">{item.name}</p>
          <p className="text-red-500">${item.price}</p>
          <div className="flex justify-between mt-8">
            <Link to={`/product/${item._id}`} className='text-xl text-blue-400 font-medium hover:text-dark'><VisibilityIcon /></Link>
            <Link to={`/staff/updateproduct/${item._id}`} className='text-xl text-yellow-400 font-medium hover:text-dark'><EditIcon /></Link>
            <button onClick={() => setShowModal(!showModal)} className='text-xl text-red-400 font-medium hover:text-dark'><DeleteIcon /></button>
          </div>
        </div>
      </div>
      {showModal && (
        <ConfirmDeleteMoadal name={item.name} link={deleteLink} onClose={() => setShowModal(false)} onDelete={handleDelete} />
      )}
    </div>
  );
}