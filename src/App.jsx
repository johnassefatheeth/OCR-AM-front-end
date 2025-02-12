// App.jsx
// import React from "react";
import { Tabs } from "./tabs";
import HomeContent from "./homeContent";
import AboutContent from "./aboutContent";
import ContactContent from "./contactContent";
import "./i18";

function App() {
  const tabs = [
    { title: "Home", value: "home", content: <HomeContent /> },
    { title: "About", value: "about", content: <AboutContent /> },
    { title: "Contact Us", value: "contact", content: <ContactContent /> },
  ];

  return (
    <div className="h-screen md:h-[40rem] [perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default App;