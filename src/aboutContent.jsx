// aboutContent.jsx
import React from "react";

const AboutContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our OCR Service</h2>
        <div className="space-y-6 text-gray-600">
          <p className="text-lg">
            Our OCR (Optical Character Recognition) service is designed to make text extraction from images simple and efficient. 
            We support multiple languages including English and Amharic, making it accessible to a diverse user base.
          </p>
          <div className="border-l-4 border-blue-500 pl-4 my-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h3>
            <ul className="space-y-2">
              <li>✓ Multi-language support</li>
              <li>✓ High accuracy text recognition</li>
              <li>✓ Easy-to-use interface</li>
              <li>✓ Multiple export formats</li>
              <li>✓ Secure file handling</li>
            </ul>
          </div>
          <p className="text-lg">
            Our technology utilizes advanced machine learning algorithms to ensure accurate text extraction from various types of images, 
            including scanned documents, photos, and screenshots.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;