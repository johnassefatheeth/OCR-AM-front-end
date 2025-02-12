// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { AiFillFilePdf } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import './i18';
// import { FileUpload } from './fileUpload.jsx';

function App() {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileTypeError, setFileTypeError] = useState('');
  const [isAmharic, setIsAmharic] = useState(i18n.language === 'am');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!image) {
      setMessage('Error: No file selected.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', image);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/ocr/upload/', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.image_url) {
        const imageUrl = 'http://127.0.0.1:8000/' + data.image_url;
  
        // Call the text extraction function
        const extractedText = await extractTextFromImage(imageUrl);
        downloadFile(extractedText);
  
        // Update the message with extracted text
        setMessage(
          <span>
            <strong>{t('success')}</strong> {t('Image_uploaded')}{' '}
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('View_Image')}
            </a>
            <br />
            <strong>{t('Extracted_Text')}:</strong> {extractedText}
          </span>
        );
      } else {
        setMessage(
          <span>
            <strong>Error:</strong> {data.message || 'An error occurred.'}
          </span>
        );
      }
    } catch (error) {
      setMessage(
        <span>
          <strong>Error:</strong> {error.message || 'An error occurred.'}
        </span>
      );
    }
  };
  // Example function to send a POST request to trigger the download
async function downloadFile(texttobeDownloaded/*, formatType*/) {
  const extractedText = texttobeDownloaded;  // Replace with your actual text
  const formatType = 'pdf';  // You can dynamically set this (txt, docx, or pdf)

  // Create the request payload
  const payload = {
      format: formatType,
      extracted_text: extractedText
  };

  try {
      const response = await fetch('/ocr/download/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Check if the response is successful
      if (response.ok) {
          // Redirect the user to the download URL
          window.location.href = data.download_url;
      } else {
          console.error('Error:', data.error);
          alert('An error occurred during the download.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during the download.');
  }
}


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // Check for file type
    if (!file.type.startsWith('image/')) {
      setFileTypeError(t('error')); // Use translation for error
      setImage(null);
      setPreviewUrl('');
      return;
    }

    setFileTypeError('');
    setImage(file);

    // Generate preview URL using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result); // Set the preview URL
    };
    reader.readAsDataURL(file);
  };

  const extractTextFromImage = async (imageUrl) => {
    const response = await fetch('http://127.0.0.1:8000/ocr/extract-text/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_url: imageUrl }),
    });
    const data = await response.json();
    console.log(data);
    return data.result.predicted_text || 'No text extracted.';
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf,image/*',
    multiple: false,
  });

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsAmharic(lang === 'am');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="flex float-end w-full mr-40 mb-4 ml-0 justify-end items-center">
        <span className="mr-2 text-lg">{isAmharic ? 'አማርኛ' : 'English'}</span>
        <label htmlFor="language-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="language-toggle"
              type="checkbox"
              className="sr-only"
              checked={isAmharic}
              onChange={(e) => handleLanguageChange(e.target.checked ? 'am' : 'en')}
            />
            <div className="block bg-gray-400 w-12 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${isAmharic ? 'transform translate-x-6' : ''}`}
            ></div>
          </div>
        </label>
      </div>
      <h1 className={`text-4xl mb-20 mt-40 font-bold ${i18n.language === 'en' ? 'font-jost' : 'font-amharic'}`}>{t('header_text')}</h1>
      <h2 className={`text-2xl font-semibold ${i18n.language === 'en' ? 'font-jost' : 'font-amharic'} text-gray-700`}>{t('drag_drop')}</h2>

      <div
        {...getRootProps()}
        className="w-full max-w-3xl h-80 border-4 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer bg-white text-center p-4"
      >
        <input {...getInputProps()} />
        <div>
          <h3 className="text-xl font-semibold font-jost text-gray-700">{t('drag_drop')}</h3>
          <p className="text-gray-500">or click to browse</p>
        </div>
      </div>

      {fileTypeError && <p className="mt-4 text-red-600 text-lg">{fileTypeError}</p>}

      {image && previewUrl && (
        <div className="mt-8 text-center relative">
          <h3 className="text-2xl font-semibold font-jost text-gray-700">{t('file_preview_image')}</h3>
          <button
            onClick={() => {
              setImage(null);
              setPreviewUrl('');
            }}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-700"
          >
            &times;
          </button>
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-4 max-w-full max-h-96 rounded-lg shadow-lg"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full text-lg font-semibold font-jost hover:bg-blue-700 transition-all duration-200"
      >
        {t('upload')}
      </button>

      {/* <FileUpload onChange={handleImageChange} /> */}

      {message && (
        <div className="mt-4 text-lg">
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
