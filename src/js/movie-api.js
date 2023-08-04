import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = 'cda787ff65897c02dfdb871d24f46952';

export async function fetchImages(query = '', page = 1) {
  const end_point = '/search/movie';

  const par = new URLSearchParams({
    api_key: API_KEY,
    query: query,
    language: 'uk-Uk',
    page: page,
  });

  const url = `${BASE_URL}${end_point}?${par}`;

  console.log(url);

  const responce = await axios.get(url);
  return responce.data;
}

export async function getMovieById(id = '') {
  // https://api.themoviedb.org/3/movie/157336?api_key=cda787ff65897c02dfdb871d24f46952&append_to_response=videos,images

  const end_point = `/movie/${id}`;

  const par = new URLSearchParams({
    api_key: API_KEY,
    language: 'uk-Uk',
  });

  const url = `${BASE_URL}${end_point}?${par}`;

  console.log(url);

  const responce = await axios.get(url);
  return responce.data;
}
