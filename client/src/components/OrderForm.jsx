import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDropzone } from "react-dropzone";
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function OrderForm({ product }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [qtyError, setQtyError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialSelectedOptions = {};
    if (product && product.specificDetails) {
      product.specificDetails.forEach(detail => {
        initialSelectedOptions[detail.name] = detail.values.length > 0 ? detail.values[0] : '';
      });
    }
    return { selectedDetails: initialSelectedOptions };
  });

  const handleAddToCart = () => {
    if(!selectedOptions.selectedDetails.qty) {
      setQtyError(true)
      return
    }
    const formData = new FormData();
    formData.append('productID', product._id);
    formData.append('price', product.price);
    formData.append('selectedDetailString', JSON.stringify(selectedOptions.selectedDetails));
  
    files.forEach(file => {
      formData.append('images', file);
    });
  
    axios.put('http://localhost:3002/cart', formData, { withCredentials: true })
      .then(() => {
        navigate('/cart');
        enqueueSnackbar('Product Added To Cart', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleSelectedChange = (detailName, selectedValue) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      selectedDetails: {
        ...prevOptions.selectedDetails,
        [detailName]: selectedValue
      }
    }));
  };

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const onDrop = acceptedFiles => {
    if (acceptedFiles.length) {
      if (files.length + acceptedFiles.length > 3) {
        enqueueSnackbar("You can only upload up to 3 images", { variant: 'error' });
      } else {
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file => (
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ))
        ]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 5000,
    onDrop
  });

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

      <FormControl key="qty" className="col-span-2">
        <TextField 
          error={qtyError}
          label="Qty"
          type="number" 
          variant="standard"
          size="small"
          value={selectedOptions.selectedDetails.qty || ''}
          onChange={(e) => handleSelectedChange('qty', e.target.value)}
          helperText={qtyError? "Qty required" : ""}
        />
      </FormControl>
      
      <div {...getRootProps({ className: 'col-span-2 p-5 border border-dashed border-dark rounded-lg flex justify-center items-center' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop file here, or click to select files</p>
        )}
      </div>
      <ul className="mt-3 col-span-2 grid grid-cols-3 gap-2">
        {files.map(file => (
          <li key={file.name} className="relative">
            <div className="flex justify-center items-center">
              <img src={file.preview} alt='' className="object-cover max-w-28 max-h-28 mx-auto shadow-lg" onLoad={() => { URL.revokeObjectURL(file.preview) }} />
            </div>
            <button type="button" className='flex justify-center item-center border rounded-full bg-tan absolute -top-2 -right-1 hover:text-tan hover:bg-dark' onClick={() => removeFile(file.name)}>
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddToCart} className="col-span-2 bg-tan rounded-md py-3 text-xl font-bold hover:bg-orange-500">
        Add To Cart
      </button>
    </div>
  );
}
