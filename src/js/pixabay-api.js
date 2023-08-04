import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '8383420-2fd3a74e6fa7f1c43c1b3aa8e';

export async function fetchImages(q = '', page = 1) {
  const par = new URLSearchParams({
    key: API_KEY,
    q: q,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40',
  });

  const url = `${BASE_URL}?${par}`;

  const responce = await axios.get(url);
  return responce.data;
}
