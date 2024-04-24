import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from "react-dropzone";
import { useSnackbar } from 'notistack';
import axios from 'axios'

export default function CreateProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [specificDetails, setSpecificDetails] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('specificDetails', JSON.stringify(specificDetails));
    files.forEach(file => {
      formData.append('images', file);
    });
    
    axios.post('http://localhost:3002/items', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      enqueueSnackbar("Product Create", { variant: "success"})
      navigate('/staff')
    })
    .catch((err) => {
      console.log(err)
    });
  }

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name));
    if (selectedImage && selectedImage.name === name) {
      setSelectedImage(null);
    }
  };

  const onDrop = acceptedFiles => {
    if (acceptedFiles.length) {
      if (files.length + acceptedFiles.length > 5) {
        enqueueSnackbar("You can only upload up to 5 images", { variant: 'error' });
      } else {
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file => (
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ))
        ]);
        setSelectedImage(acceptedFiles[0]);
      }
    }
  };

  const handleImageClick = (file) => {
    if (file === "+") {
      setSelectedImage(null);
    } else {
      setSelectedImage(file);
    }
  };

  const handleAddDetail = () => {
    setSpecificDetails(prevDetails => [...prevDetails, { name: '', values: [] }]);
  };

  const handleRemoveDetail = (index) => {
    setSpecificDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
  };

  const handleChangeDetail = (index, key, value) => {
    setSpecificDetails(prevDetails =>
      prevDetails.map((detail, i) =>
        i === index ? { ...detail, [key]: value } : detail
      )
    );
  };

  const handleAddValue = (index) => {
    if (tempValue.trim() !== '') {
      setSpecificDetails(prevDetails =>
        prevDetails.map((detail, i) =>
          i === index ? { ...detail, values: [...detail.values, tempValue.trim()] } : detail
        )
      );
      setTempValue('');
    }
  };

  const handleRemoveValue = (detailIndex, valueIndex) => {
    setSpecificDetails(prevDetails =>
      prevDetails.map((detail, i) => {
        if (i === detailIndex) {
          const updatedValues = [...detail.values];
          updatedValues.splice(valueIndex, 1);
          return { ...detail, values: updatedValues };
        }
        return detail;
      })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 5000,
    onDrop
  });

  return (
    <form className="grid grid-cols-5 p-8" onSubmit={handleCreateProduct}>
      <div className="col-span-1 flex flex-col pt-12 justify-start items-end">
        {files.slice(0, 5).map(file => (
          <div key={file.lastModified} className='rounded-lg border border-dark bg-white h-24 w-24 mb-2 relative flex justify-center items-center'>
            <img src={file.preview} alt='' className="object-cover max-w-full max-h-full cursor-pointer" onClick={() => handleImageClick(file)} />
            <button type="button" className='flex justify-center items-center border rounded-full bg-tan absolute top-0 right-0 -mt-2 -mr-1 hover:text-tan hover:bg-dark' onClick={() => removeFile(file.name)}>
              <CloseIcon />
            </button>
          </div>
        ))}
        {files.length < 5 && (
          <div className="rounded-lg border border-dark h-24 w-24 mb-4">
            <p className='text-8xl flex justify-center items-center cursor-pointer' onClick={() => handleImageClick("+")}>+</p>
          </div>
        )}
      </div>
      <div className="col-span-3 col-start-2 grid grid-cols-7 pt-12 px-6">
        <div className="col-span-4">
          <p className='text-2xl font-medium mb-1'>Product Image</p>
          {selectedImage ? (
            <div className='w-[550px] h-[550px] bg-white flex justify-center items-center rounded-lg'>
              <img src={selectedImage.preview} alt='' className="max-w-[550px] max-h-[550px] object-cover cursor-pointer" />
            </div>
          ) : (
            <div {...getRootProps({ className: 'w-[550px] h-[550px] p-5 border border-dashed border-dark rounded-lg flex justify-center items-center' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop file here, or click to select files</p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-3 py-4 gap-4">
          <TextField
            label="Product Name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); 
              }
            }}
          />
          <TextField
            label="Product Price"
            type="text"
            variant="standard"
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                setPrice(inputValue);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); 
              }
            }}
          />
          <TextField
            label="Product Description"
            variant="standard"
            multiline
            maxRows={4}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); 
              }
            }}
          />
          <div>
            <p className="text-xl font-md">Specific Details</p>
            {specificDetails.map((detail, detailIndex) => (
              <div key={detailIndex} className='border border-dark mb-2 p-1'>
                <div className="flex gap-2">
                  <TextField
                    label="Detail Name"
                    variant="standard"
                    onChange={(e) => handleChangeDetail(detailIndex, 'name', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                  <TextField
                    label="Add Value"
                    variant="standard"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddValue(detailIndex);
                        setTempValue("");
                      }
                    }}
                  />
                  <button type="button" onClick={() => handleRemoveDetail(detailIndex)}>Remove</button>
                </div>
                <div className='grid grid-cols-3'>
                  {detail.values.map((value, valueIndex) => (
                    <div key={valueIndex} className="col-span-1 px-2 py-1 flex items-center text-small">
                      <span>{value}</span>
                      <button type="button" className="ml-2" onClick={() => handleRemoveValue(detailIndex, valueIndex)}>
                        <CloseIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" className='bg-tan mt-2 px-4 py-1 rounded-full' onClick={handleAddDetail}>Add Detail</button>
          </div>
          <button type='submit' className='rounded-full px-8 py-2 text-2xl font-medium bg-tan'>Create Product</button>
        </div>
      </div>
    </form>
  )
}
