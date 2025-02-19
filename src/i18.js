import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      drag_drop: "Drag & Drop an Image or PDF Here",
      extract: "Extract",
      error: "Please insert an image or PDF",
      too_large: "The file is too large, please upload files under 10MB",
      enter_text: "Enter text ",
      translated: "Translated Text:",
      file_preview_image: "Preview of Your Image",
      file_preview_pdf: "PDF File",
      header_text: "Extract Amharic Text Instantly",
      upload: "Upload",
      success: "Success",
      Image_uploaded: "Image uploaded",
      View_Image: "View Image",
      logo: "Brana",
      privacy: "*  Your privacy is protected! No data is transmitted or stored.",
      Download: "Download"
    },
  },
  am: {
    translation: {
      logo: "ብራና",
      drag_drop: "እባኮትን ምስል ወይም PDF ይምረጡ",
      extract: "ጽሁፍ አውጣ",
      error: "እባኮትን ምስል ወይም PDF አስገባ",
      too_large: "ፋይሉ በጣም እጅግ ትልቅ ነው፣ እባኮትን ከ 10MB በታች ፋይል አስገባ",
      enter_text: " ጽሑፍ አስገባ",
      translated: "ትርጉም:",
      file_preview_image: "ምስል ፕሪቭው",
      file_preview_pdf: "PDF ፋይል",
      header_text: "ጽሁፍ ከ ምስል ወይም PDF ይገባሉ",
      upload: "ጫን",
      success: "ተሳክቷል",
      Image_uploaded: "ምስል ተጭኗል",
      View_Image: "ምስል ይመልከቱ",
      privacy: "* ደህንነትዎ የተጠበቀ ነው፡፡ ምንም አይነት መረጃ አይተላለፍም ፣ አይቀመጥም፡፡ ማርያምን ይመኑን፡፡",
      Download: "አውርድ"
      
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Set default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
