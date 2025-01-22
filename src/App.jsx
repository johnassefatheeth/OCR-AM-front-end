import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [fileTypeError, setFileTypeError] = useState('');

  // Handle the drop of the file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check for file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError(''); // Clear previous errors
      setFileTypeError('The file is too large, please upload files under 10MB');
      setImage(null);
      return;
    }

    // Check if the file is an image or PDF
    if (file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file)); // Create a URL for the image to preview
      setError('');
      setFileTypeError('');
    } else if (file.type === 'application/pdf') {
      setImage(null);
      setError('');
      setFileTypeError('');
      alert("PDF file uploaded! (Image preview not available for PDFs)");
    } else {
      setImage(null);
      setError('Please insert an image or pdf');
      setFileTypeError('');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf,image/*', // Accept only image and PDF files
    multiple: false, // Only allow a single file to be dropped at a time
  });

  const handleCloseImage = () => {
    setImage(null); // Clear the image
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

      {/* Image preview and close button */}
      {image && (
        <div className="mt-8 text-center relative">
          <h3 className="text-2xl font-semibold text-gray-700">Preview of Your Image:</h3>
          <button
            onClick={handleCloseImage}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-700"
          >
            &times;
          </button>
          <img
            src={image}
            alt="Preview"
            className="mt-4 max-w-full max-h-96 rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default App;
