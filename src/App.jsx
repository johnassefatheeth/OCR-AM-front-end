import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillFilePdf } from 'react-icons/ai';  // PDF Icon from react-icons

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [fileTypeError, setFileTypeError] = useState('');

  // Handle the drop of the file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check for file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError(''); // Clear previous errors
      setFileTypeError('The file is too large, please upload files under 10MB');
      setFile(null);
      return;
    }

    // Check if the file is an image or PDF
    if (file.type.startsWith('image/')) {
      setFile({
        type: 'image',
        preview: URL.createObjectURL(file), // Image preview URL
        name: file.name, // Save the file name
      });
      setError('');
      setFileTypeError('');
    } else if (file.type === 'application/pdf') {
      setFile({
        type: 'pdf',
        name: file.name, // Save the PDF file name
      });
      setError('');
      setFileTypeError('');
    } else {
      setFile(null);
      setError('Please insert an image or PDF');
      setFileTypeError('');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf,image/*', // Accept only image and PDF files
    multiple: false, // Only allow a single file to be dropped at a time
  });

  const handleCloseFile = () => {
    setFile(null); // Clear the file
    setError('');
    setFileTypeError('');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div
        {...getRootProps()}
        className="w-full max-w-3xl h-80 border-4 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer bg-white text-center p-4"
      >
        <input {...getInputProps()} />
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Drag & Drop an Image or PDF Here</h3>
          <p className="text-gray-500">or click to browse</p>
        </div>
      </div>

      {/* Display error messages */}
      {error && <p className="mt-4 text-red-600 text-lg">{error}</p>}
      {fileTypeError && <p className="mt-4 text-red-600 text-lg">{fileTypeError}</p>}

      {/* File preview (Image or PDF) */}
      {file && (
        <div className="mt-8 text-center relative">
          <h3 className="text-2xl font-semibold text-gray-700">
            {file.type === 'image' ? 'Preview of Your Image' : 'PDF File: '}
          </h3>
          <button
            onClick={handleCloseFile}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-700"
          >
            &times;
          </button>

          {file.type === 'image' ? (
            <img
              src={file.preview}
              alt="Preview"
              className="mt-4 max-w-full max-h-96 rounded-lg shadow-lg"
            />
          ) : (
            <div className="mt-4">
              <AiFillFilePdf className="text-red-600 text-6xl mx-auto" />
              <p className="mt-2 text-gray-700 text-lg">{file.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
