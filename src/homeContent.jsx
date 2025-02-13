// homeContent.jsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

const HomeContent = () => {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileTypeError, setFileTypeError] = useState("");
  const [isAmharic, setIsAmharic] = useState(i18n.language === "am");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("docs"); // Default format

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setMessage("Error: No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/ocr/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.image_url) {
        const imageUrl = "http://127.0.0.1:8000/" + data.image_url;
        const extractedText = await extractTextFromImage(imageUrl);
        setMessage(extractedText);

      } else {
        setMessage(
          <span>
            <strong>Error:</strong> {data.message || "An error occurred."}
          </span>
        );
      }
    } catch (error) {
      setMessage(
        <span>
          <strong>Error:</strong> {error.message || "An error occurred."}
        </span>
      );
    }
  };

  const downloadFile = async (texttobeDownloaded,formatType='docx') => {
    const extractedText = texttobeDownloaded;
    // const formatType = "docx";
    const payload = {
      format: formatType,
      extracted_text: extractedText,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/ocr/download/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (response.ok) {
        const downloadUrl = "http://127.0.0.1:8000" + data.download_url;
    
        window.open(downloadUrl, '_blank');
      } else {
        console.error("Error:", data.error);
        alert("An error occurred during the download.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during the download.");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      setFileTypeError(t("error"));
      setImage(null);
      setPreviewUrl("");
      return;
    }
    setFileTypeError("");
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const extractTextFromImage = async (imageUrl) => {
    const response = await fetch("http://127.0.0.1:8000/ocr/extract-text/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: imageUrl }),
    });
    const data = await response.json();
    return data.result.predicted_text || "No text extracted.";
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf,image/*",
    multiple: false,
  });

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsAmharic(lang === "am");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="flex float-end w-full mr-40 mb-4 ml-0 justify-end items-center">
        <span className={`mr-2 text-lg ${isAmharic ? "font-amharic" : "font-jost"}`}>
          {isAmharic ? "አማርኛ" : "English"}
        </span>
        <label
          htmlFor="language-toggle"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              id="language-toggle"
              type="checkbox"
              className="sr-only"
              checked={isAmharic}
              onChange={(e) =>
                handleLanguageChange(e.target.checked ? "am" : "en")
              }
            />
            <div className="block bg-gray-400 w-12 h-6 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${
                isAmharic ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>

      <h1
        className={`text-6xl mb-20 mt-40 font-semibold ${
          i18n.language === "en" ? "font-jost" : "font-amharic"
        }`}
      >
        {t("header_text")}
      </h1>

      <div
        {...getRootProps()}
        className="w-full max-w-3xl h-80 border-4 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer bg-white text-center p-4"
      >
        <input {...getInputProps()} />
        <div>
          <h3 className="text-xl font-semibold font-jost text-gray-700">
            {t("drag_drop")}
          </h3>
          <p className="text-gray-500">or click to browse</p>
        </div>
      </div>

      {fileTypeError && (
        <p className="mt-4 text-red-600 text-lg">{fileTypeError}</p>
      )}

      {image && previewUrl && (
        <div className="mt-8 text-center relative">
          <h3 className="text-2xl font-semibold font-jost text-gray-700">
            {t("file_preview_image")}
          </h3>
          <button
            onClick={() => {
              setImage(null);
              setPreviewUrl("");
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
      <h1
        className={`text-left font-semibold ${
          i18n.language === "en" ? "font-jost" : "font-amharic"
        }`}
      >
        {t("privacy")}
      </h1>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-[#0F0E0E] text-[#E7ECEF] hover:text-[#0F0E0E] rounded-full text-lg font-semibold font-jost hover:bg-[#E7ECEF] hover:outline hover:outline-1 hover:outline-[#0F0E0E] transition-all duration-200"
      >
        {t("upload")}
      </button>

      {message && <div className="mt-4 w-full max-w-3xl">
    <h3 className="text-2xl font-semibold font-jost text-gray-700">
      {t("Extracted_Text")}:
    </h3>
    <textarea
      value={message.toString()} // Display the extracted text in the textarea
      readOnly // Make it read-only since it's the extracted text
      className="mt-4 w-full h-40 p-4 border border-gray-300 rounded-lg shadow-lg resize-none"
    />
    {/* Button with dropdown */}
    <div className="relative">
        <button
        onClick={() => setDropdownVisible((prev) => !prev)}
          className="mt-4 px-6 py-2 bg-gray-700 text-white hover:bg-gray-900 rounded-full text-lg font-semibold font-jost transition-all duration-200"
        >
          {t("Download")}
        </button>

        {dropdownVisible && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-40 z-10">
            <ul>
              {["docx", "pdf", "txt"].map((format) => (
                <li
                  key={format}
                  onClick={() =>  downloadFile(message.toString(),format)} 
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {format.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
  </div>}
    </div>
  );
};

export default HomeContent;
