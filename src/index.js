import { fetchImages, getMovieById } from './js/movie-api.js';
import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as basicLightbox from 'basiclightbox';

const formEl = document.querySelector('#search-form');
const btnMoreEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);
btnMoreEl.addEventListener('click', onMoreClick);
galleryEl.addEventListener('click', onImageClick);

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onMoreClick, options);

function onMoreClick(entries, observer) {
  entries.forEach(element => {
    if (element.isIntersecting) {
      loadImages();
    }
  });
}

// const lightbox = new SimpleLightbox('.photo-card a', {
//   /* options */
//   captions: true,
//   captionsData: 'alt',
//   captionSelector: 'img',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });

let q = '';
let page = 1;

async function loadImages() {
  try {
    const images = await fetchImages(q, page);

    if (!images.results.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      observer.unobserve(btnMoreEl);
    }

    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    }

    console.log(page);
    createMarkupCard(images);
    page += 1;

    // btnMoreEl.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    observer.unobserve(btnMoreEl);
  }
}

async function loadMovie(id) {
  try {
    const { title, overview, poster_path, release_date, backdrop_path } =
      await getMovieById(id);

    console.log(id);

    instance
      .element()
      .querySelector(
        'img'
      ).src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    instance.element().querySelector('.modal-title').textContent = title;

    // btnMoreEl.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    observer.unobserve(btnMoreEl);
  }
}

async function onFormSubmit(event) {
  event.preventDefault();
  Notiflix.Loading.standard('Loading data, please wait...');
  galleryEl.innerHTML = '';
  page = 1;
  q = event.target.elements.searchQuery.value;
  await loadImages();
  observer.observe(btnMoreEl);
  Notiflix.Loading.remove();
}

function createMarkupCard({ results }) {
  const markupGallery = results
    .map(
      ({ title, overview, poster_path, id, release_date, backdrop_path }) => {
        return `<div class="photo-card">
  <a class="photo-link" href="https://image.tmdb.org/t/p/w400/${backdrop_path}">
    <img class="photo-img" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" loading="lazy" data-source="https://image.tmdb.org/t/p/w500/${poster_path}" data-id="${id}" />
  </a>
  <div class="info">
    <p class="info-item">
      <h2>${title} </h2>
    </p>
    <p class="info-item">
      ${release_date}
    </p>
    <p class="info-item">
      ${overview}
    </p>    
  </div> 
  
</div>`;
      }
    )
    .join(' ');

  galleryEl.insertAdjacentHTML('beforeend', markupGallery);
  lightbox.refresh();
}

function onEscDown(event) {
  if (event.code === 'Escape') {
    instance.close();
  }
}

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const id = event.target.dataset.id;

  loadMovie(id);

  instance.show();
}

const instance = basicLightbox.create(
  `<div class="photo-card"> 
  <img class="photo-img" src="" alt="" loading="lazy" /> 
  <div class="info">
    <p class="info-item">
      <h2 class="modal-title">title</h2>
    </p>
    <p class="info-item">
      
    </p>
    <p class="info-item">
      
    </p>    
  </div> 
  
</div>`,
  {
    onShow: () => {
      document.addEventListener('keydown', onEscDown);
    },
    onClose: () => {
      document.removeEventListener('keydown', onEscDown);
    },
  }
);
