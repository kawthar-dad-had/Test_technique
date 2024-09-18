import React, { useEffect, useState } from 'react';

function Home() {
  const [dogImage, setDogImage] = useState('');

  // Fonction pour récupérer l'image aléatoire depuis l'API
  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);  // L'image est dans data.message
    } catch (error) {
      console.error('Erreur lors du fetch de l\'image aléatoire de chien :', error);
    }
  };

  // Appel de la fonction fetch lorsque le composant est monté
  useEffect(() => {
    fetchRandomDogImage();
  }, []);  // Le tableau vide signifie que l'effet ne se lance qu'une seule fois, au montage

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to Dog Lovers!</h1>
        <p style={styles.subtitle}>Explore our gallery and discover the dog breeds you love the most!</p>
      </div>
      {dogImage && (
        <div style={styles.imageWrapper}>
          <img src={dogImage} alt="Random Dog" style={styles.bannerImage} />
        </div>
      )}
    </div>
  );
}

// Quelques styles simples
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    marginTop: 50,
    backgroundColor: '#f0f8ff', // Light background color for the whole page
    minHeight: '100vh', // Full height of the viewport
  },
  header: {
    marginBottom: '30px', // Space below the header
  },
  title: {
    fontSize: '2.5rem', // Larger font size for the title
    color: '#333', // Dark color for better readability
    margin: '0',
  },
  subtitle: {
    fontSize: '1.2rem', // Slightly larger font size for the subtitle
    color: '#555', // Lighter color for the subtitle
    margin: '10px 0', // Space around the subtitle
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow around the image
    backgroundColor: '#fff', // White background for the image container
    maxWidth: '800px', // Limit the width of the image container
    margin: '0 auto', // Center the image container horizontally
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
};

export default Home;
