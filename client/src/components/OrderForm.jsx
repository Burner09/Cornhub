import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'; // Import TextField for the qty input
import DropZone from "../components/Widgets/DropZone";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderForm({ product }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialSelectedOptions = {};
    if (product && product.specificDetails) {
      Object.entries(product.specificDetails).forEach(([detailName, options]) => {
        initialSelectedOptions[detailName] = options.length > 0 ? options[0] : '';
      });
    }
    return { selectedDetails: initialSelectedOptions };
  });

  const handleSelectedChange = (detailName, selectedValue) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      selectedDetails: {
        ...prevOptions.selectedDetails,
        [detailName]: selectedValue
      }
    }));
  };

  const handleFileUploadComplete = (uploadedFiles) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      images: uploadedFiles
    }));
  };

  const handleAddToCart = () => {
    selectedOptions.productID = product._id;
    selectedOptions.price = product.price;
    axios.put('http://localhost:3002/cart', selectedOptions, { withCredentials: true })
      .then(() => {
        navigate('/cart');
        enqueueSnackbar('Product Added To Cart', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      {product.specificDetails && product.specificDetails.map((detail) => (
        <FormControl key={detail.name} className={`col-span-${detail.value === 'qty' ? 2 : 1}`} size="small">
          <InputLabel id={`select-label-${detail.name}`}>{detail.name}</InputLabel>
          <Select
            labelId={`select-label-${detail.name}`}
            id={`select-${detail.name}`}
            value={(selectedOptions.selectedDetails && selectedOptions.selectedDetails[detail.name]) || (detail.values.length > 0 ? detail.values[0] : '')}
            label={detail.name}
            onChange={(e) => handleSelectedChange(detail.name, e.target.value)}
          >
            {detail.values.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
      <FormControl key="qty" className="col-span-2" size="small">
        <TextField 
          label="Qty" 
          variant="standard"
          value={selectedOptions.selectedDetails.qty || ''}
          onChange={(e) => handleSelectedChange('qty', e.target.value)}/>
      </FormControl>

      <DropZone
        className='p-5 mt-5 border border-dashed border-dark'
        onFileUploadComplete={handleFileUploadComplete}
      />

      <button onClick={handleAddToCart} className="col-span-2 bg-tan rounded-md py-4 text-xl font-bold hover:bg-orange-500">
        Add To Cart
      </button>
    </div>
  );
}
