import React, { useState } from "react";
import { Button } from "primereact/button";
import "./ImageGallery.css";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const tooltipConfig = { position: "bottom", showOnDisabled: true };

function ImageGallery({
  imagesData,
  showDownload = true,
  showName = true,
  index = 0,
  closeGallery,
}: {
  imagesData: any;
  showDownload: boolean;
  showName: boolean;
  index: number;
  closeGallery: () => void;
}) {
  const [images, setImages] = useState(imagesData);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const rotateRight = () => {
    setRotation(rotation + 90);
  };
  const rotateLeft = () => {
    setRotation(rotation - 90);
  };
  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.2, MAX_ZOOM));
  };
  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.2, MIN_ZOOM));
  };
  const handleReset = () => {
    setRotation(0);
    setZoom(1);
  };
  const handleNext = () => {
    handleReset();
    setCurrentIndex(
      currentIndex === images.length - 1 ? currentIndex : currentIndex + 1
    );
  };
  const handlePrevious = () => {
    handleReset();
    setCurrentIndex(currentIndex === 0 ? currentIndex : currentIndex - 1);
  };
  const imageStyle = {
    transform: `rotate(${rotation}deg) scale(${zoom})`,
  };
  return (
    <div className="backdrop">
      <div className="gallery-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="gallery">
          <div className="gallery__controls m-2">
            <Button
              icon="pi pi-refresh"
              onClick={rotateRight}
              tooltip="Rotate Right"
              tooltipOptions={tooltipConfig as TooltipOptions}
              className="control control--rotate-right"
            />
            <Button
              icon="pi pi-replay"
              onClick={rotateLeft}
              tooltip="Rotate Left"
              tooltipOptions={tooltipConfig as TooltipOptions}
              className="control control--rotate-left"
            />
            <Button
              icon="pi pi-search-plus"
              onClick={zoomIn}
              disabled={zoom === MAX_ZOOM}
              tooltip="Zoom In"
              tooltipOptions={tooltipConfig as TooltipOptions}
              className="control control--zoom-in"
            />
            <Button
              icon="pi pi-search-minus"
              onClick={zoomOut}
              tooltip="Zoom Out"
              disabled={zoom === MIN_ZOOM}
              tooltipOptions={tooltipConfig as TooltipOptions}
              className="control control--zoom-out"
            />
            {showDownload && (
              <Button
                icon="pi pi-download"
                tooltip="Download"
                tooltipOptions={tooltipConfig as TooltipOptions}
                className="control control--download"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = images[currentIndex].imgUri;
                  link.download = images[currentIndex].imgName || "image";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              />
            )}
            <Button
              icon="pi pi-sync"
              disabled={zoom === 1 && rotation === 0}
              onClick={handleReset}
              className="control control--reset"
              tooltip="Reset"
              tooltipOptions={tooltipConfig as TooltipOptions}
            />
            <Button
              icon="pi pi-times"
              className="control control--close"
              tooltip="Close"
              onClick={closeGallery}
              tooltipOptions={tooltipConfig as TooltipOptions}
            />
          </div>
          <div className="gallery__images">
            <div className="gallery__image-container">
              <Button
                icon="pi pi-chevron-left "
                tooltip="Previous"
                tooltipOptions={tooltipConfig as TooltipOptions}
                className="control control--previous"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              />
              <div className="gallery__image-details">
                <img
                  src={images[currentIndex].imgUri}
                  alt="Gallery"
                  className="gallery__image"
                  style={imageStyle}
                  height={400}
                  width={400}
                />
                {/* <div className="gallery__image-info">
              {showName && (
                <div className="image-name">{images[currentIndex].imgName}</div>
              )}
            </div> */}
              </div>
              <Button
                icon="pi pi-chevron-right "
                className="control control--next"
                tooltip="Next"
                tooltipOptions={tooltipConfig as TooltipOptions}
                onClick={handleNext}
                disabled={currentIndex === images.length - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
