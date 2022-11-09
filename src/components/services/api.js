import axios from 'axios';

const KEY = '30240578-43afdca340dbb2f4dbb691dc2';
const URL = 'https://pixabay.com/api/';

function fetchImages(name, page) {
  const response = axios.get(
    `${URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

const api = {
  fetchImages,
};
export default api;
