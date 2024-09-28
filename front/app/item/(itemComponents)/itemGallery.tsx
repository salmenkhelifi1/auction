"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./style/itemGallery.css";

interface GalleryProps {
  items: { id: number; images: string[] }[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [currentImage, setCurrentImage] = useState(items[0]?.images[0] || "");

  const handleClick = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <section className="gallery-holder hide-in-mobile mt-10">
      <section className="gallery">
        <div className="image">
          <Image
            className="image"
            src={currentImage}
            alt="product"
            width={900}
            height={500}
          />
        </div>

        <div className="thumbnails">
          {items.map((item) =>
            item.images.map((image, index) => (
              <div
                className="img-holder"
                key={index}
                onClick={() => handleClick(image)}
              >
                <div
                  className={`outlay ${currentImage === image && "activated"}`}
                ></div>
                <Image
                  src={image}
                  alt={`product-${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
