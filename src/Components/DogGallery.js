import React, { useEffect, useState } from 'react';
import Slider from "react-slick"; // Import Slick Carousel
import "slick-carousel/slick/slick.css"; // Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Theme
import { height } from '@mui/system';

function DogGallery() {
  const [dogImages, setDogImages] = useState([]);

  // Fetch dog images from Dog CEO API
  const fetchDogImages = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/6'); // Fetch 6 random images
      const data = await response.json();
      setDogImages(data.message); // Images are in data.message
    } catch (error) {
      console.error('Error fetching dog images:', error);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchDogImages();
  }, []);

  // Slick slider settings with responsive breakpoints
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default number of images to show on large screens
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Tablet and small desktops
        settings: {
          slidesToShow: 2, // Show 2 images
        },
      },
      {
        breakpoint: 600, // Smartphones in landscape
        settings: {
          slidesToShow: 1, // Show 1 image
        },
      },
      {
        breakpoint: 480, // Small smartphones in portrait
        settings: {
          slidesToShow: 1, // Show 1 image
        },
      },
    ],
  };

  return (
    <div className="wrapper" style={{marginTop: 70}}>
      <h2>Dog Gallery Carousel</h2>
      <Slider {...settings} className="carousel">
        {dogImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Dog ${index + 1}`} style={styles.dogImage} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Styles
const styles = {
  dogImage: {
    width: '100%', // Full width of the container
    height: "50%",
    border: '2px solid #fff',
    borderRadius: '10px',
    objectFit: 'cover',
  },
};

export default DogGallery;
