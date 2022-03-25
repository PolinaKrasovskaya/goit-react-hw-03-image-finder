const API_KEY = '22757150-c2d7916cb8ffee93e4314d78c';
const BASE_URL = 'https://pixabay.com/api/';

function fetchPictures(request, page) {

  return fetch(
    `${BASE_URL}?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`We have no find any ${request}`));
  });
}

const imageAPI = {
  fetchPictures
};

export default imageAPI;