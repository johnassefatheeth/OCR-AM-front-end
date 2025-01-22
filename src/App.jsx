import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillFilePdf } from 'react-icons/ai';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './i18'; // Ensure you have your i18n configuration

function App() {
  const { t, i18n } = useTranslation(); // Access translation function and language change method
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [fileTypeError, setFileTypeError] = useState('');

  const [isAmharic, setIsAmharic] = useState(i18n.language === 'am'); // Track if the language is Amharic

  // Handle the drop of the file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check for file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('');
      setFileTypeError(t('too_large')); // Use translation for error
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
      setError(t('error')); // Use translation for error
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

  const handleExtract = () => {
    // Placeholder for actual extraction logic
    alert(t('extract'));
  };

  // Handle language change with toggle switch
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Switch language
    setIsAmharic(lang === 'am'); // Update language state
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Language Switcher as a toggle */}
      <div className="flex float-end w-full mr-40 mb-4 ml-0 justify-end items-center">
        <span className="mr-2 text-lg">{isAmharic ? 'አማርኛ' : 'English'}</span>
        <label htmlFor="language-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="language-toggle"
              type="checkbox"
              className="sr-only"
              checked={isAmharic} // Set the switch state based on the language
              onChange={(e) => handleLanguageChange(e.target.checked ? 'am' : 'en')} // Change language when toggled
            />
            <div className="block bg-gray-400 w-12 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${isAmharic ? 'transform translate-x-6' : ''}`}
            ></div>
          </div>
        </label>
      </div>
      <h1 className={`text-4xl mb-20 mt-40 font-bold ${i18n.language === 'en' ? 'font-jost' : ''}`}>{t('header_text')}</h1>
      <h2 className="text-2xl font-semibold text-gray-700">{t('drag_drop')}</h2>

      <div
        {...getRootProps()}
        className="w-full max-w-3xl h-80 border-4 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer bg-white text-center p-4"
      >
        <input {...getInputProps()} />
        <div>
          <h3 className="text-xl font-semibold text-gray-700">{t('drag_drop')}</h3>
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
            {file.type === 'image' ? t('file_preview_image') : t('file_preview_pdf')}
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

          {/* Extract button */}
          <button
            onClick={handleExtract}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            {t('extract')}
          </button>
        </div>
      )}

      {/* Translate Section */}
      <div className="mt-8 text-center w-full max-w-md"></div>
    </div>
  );
}

export default App;
