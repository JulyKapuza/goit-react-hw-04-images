import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import api from '../components/services/api';
import { toast } from 'react-toastify';
import Modal from 'components/Modal/Modal';
import MyLoader from './Loader/Loader';
import Button from './Button/Button';

function App() {
  
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    try {
      setIsLoading(true);

      const response = api.fetchImages(imageName, page);
      response.then(images => {
        if (images.data.totalHits === 0) {
          toast('🦄 Enter correct request!');
          setImages([]);
          return;
        }

        images.data.hits.forEach(
          ({ id, webformatURL, largeImageURL, tags }) => {
            setImages(state => [
              ...state,
              { id, webformatURL, largeImageURL, tags },
            ]);
            setTotalPages(Math.ceil(images.data.totalHits / 12));
            setIsLoading(false);
          }
        );
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [imageName, page]);

  const onClick = photo => {
    const largeImage = photo;
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const onLoadMore = () => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  return (
    <div className="container">
      {<Searchbar onSubmit={handleFormSubmit} />}

      {
        <ImageGallery
          images={images}
          onClick={onClick}
          totalPages={totalPages}
          page={page}
          onLoadMore={onLoadMore}
          isLoading={isLoading}
        />
      }
      {isLoading && <MyLoader />}
      {images.length >= 12 && totalPages > page && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && <Modal src={largeImage} onClose={toggleModal} />}
      <ToastContainer />
    </div>
  );
}

export default App;
