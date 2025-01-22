import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const [image, setImage] = useState(null);

  // Handle the drop of the file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a URL for the image to preview
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
    multiple: false, // Only allow a single file to be dropped at a time
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div
        {...getRootProps()}
        className="w-full max-w-3xl h-80 border-4 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer bg-white text-center p-4"
      >
        <input {...getInputProps()} />
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Drag & Drop an Image Here</h3>
          <p className="text-gray-500">or click to browse</p>
        </div>
      </div>

      {image && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">Preview of Your Image:</h3>
          <img src={image} alt="Preview" className="mt-4 max-w-full max-h-96 rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}

export default App;
