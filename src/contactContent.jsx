// contactContent.jsx
import React from "react";

const ContactContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              id="message"
              placeholder="Your message..."
            />
          </div>
          <button
            className= "mt-4 px-6 py-2 bg-[#0F0E0E] text-[#E7ECEF] hover:text-[#0F0E0E] rounded-full text-lg font-semibold font-jost hover:bg-[#E7ECEF] hover:outline hover:outline-1 hover:outline-[#0F0E0E] transition-all duration-200"
            type="button"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactContent;