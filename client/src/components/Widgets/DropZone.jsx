import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

export default function DropZone({ className, onFileUploadComplete }) {
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file => (
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ))
      ]);
    }

    if (rejectedFiles.length) {
      enqueueSnackbar(rejectedFiles[0].errors[0].code, { variant: 'error' });
      console.log(rejectedFiles);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (files.length > 0) {
      onFileUploadComplete(files);
    }
  }, [files, onFileUploadComplete]); 
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 5000,
    onDrop
  });

  return (
    <form className="col-span-2 ">
      <p className="text-xl font-md">Upload Design:</p>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop file here, or click to select files</p>
        )}
      </div>

      <ul className="mt-3 grid grid-cols-3 gap-2">
        {files.map(file => (
          <li key={file.name} className="relative">
            <div className="flex justify-center items-center">
              <img src={file.preview} alt='' className="object-cover max-w-28 max-h-28 mx-auto shadow-lg" onLoad={() => { URL.revokeObjectURL(file.preview) }} />
            </div>
            <button type="button" className='flex justify-center item-center border rounded-full bg-tan absolute -top-2 -right-1 hover:text-tan hover:bg-dark' onClick={() => removeFile(file.name)}>
              <CloseIcon />
            </button>
            <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
              {file.name}
            </p>
          </li>
        ))}
      </ul>
    </form>
  );
}
