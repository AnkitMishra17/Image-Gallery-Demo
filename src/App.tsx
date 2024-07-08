import { useState } from "react";
import "./App.css";
import ImageGallery from "./UI/ImageGallery/ImageGallery";
import { Button } from "primereact/button";

function App() {
  const images = [
    {
      imgUri:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg",
      imgName: "Roads Untravelled",
    },
    {
      imgUri:
        "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg",
      imgName: "Hand & Sea",
    },
    {
      imgUri:
        "https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg",
      imgName: "Unshackled",
    },
    {
      imgUri:
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
      imgName: "Silhouette of Mountains",
    },
    {
      imgUri:
        "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg",
      imgName: "Sunflower",
    },
  ];
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  return (
    <div className="app">
      <Button
        onClick={openGallery}
        label="Open Gallery"
        className="rounded mt-2"
      />
      {isGalleryOpen && (
        <ImageGallery
          imagesData={images}
          index={1}
          closeGallery={closeGallery}
        />
      )}
    </div>
  );
}

export default App;
