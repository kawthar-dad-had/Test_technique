// DogBreedSearch.js
import React, { useState } from 'react';
import SearchAppBar from './SearchAppBar'; // Import the SearchAppBar component

function DogBreedSearch() {
  const [breed, setBreed] = useState(''); // Stocker la race de chien saisie par l'utilisateur
  const [images, setImages] = useState([]); // Stocker les images récupérées
  const [error, setError] = useState(null); // Pour gérer les erreurs si la race est introuvable

  // Fonction pour récupérer les images de la race de chien spécifiée
  const fetchBreedImages = async () => {
    try {
      setError(null); // Réinitialiser l'erreur avant la nouvelle requête
      const response = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images`);
      const data = await response.json();

      if (data.status === 'success') {
        setImages(data.message); // Mettre à jour les images avec les résultats récupérés
      } else {
        throw new Error('Breed not found'); // Lancer une erreur si la race est introuvable
      }
    } catch (error) {
      setError('Sorry, this breed was not found. Please try another one.'); // Afficher un message d'erreur
      setImages([]); // Vider les images en cas d'erreur
    }
  };

  return (
    <div>
      <SearchAppBar
        searchValue={breed}
        onSearchChange={setBreed}
        onSearch={fetchBreedImages}
      />
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Dog breed ${breed}`} style={styles.image} />
          ))}
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

// Quelques styles simples
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  image: {
    width: '200px',
    height: 'auto',
    margin: '10px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
};

export default DogBreedSearch;
