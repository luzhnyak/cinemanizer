import { fetchImages } from './js/pixabay-api.js';
import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const btnMoreEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);
btnMoreEl.addEventListener('click', onMoreClick);

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

const lightbox = new SimpleLightbox('.photo-card a', {
  /* options */
  captions: true,
  captionsData: 'alt',
  captionSelector: 'img',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let q = '';
let page = 1;

async function loadImages() {
  try {
    const images = await fetchImages(q, page);

    if (!images.hits.length) {
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

async function onFormSubmit(event) {
  event.preventDefault();
  Notiflix.Loading.standard('Loading data, please wait...');
  galleryEl.innerHTML = '';
  q = event.target.elements.searchQuery.value;
  await loadImages();
  observer.observe(btnMoreEl);
  Notiflix.Loading.remove();
}

function createMarkupCard({ hits }) {
  const markupGallery = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a class="photo-link" href="${largeImageURL}">
    <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div> 
  
</div>`;
      }
    )
    .join(' ');

  galleryEl.insertAdjacentHTML('beforeend', markupGallery);
  lightbox.refresh();
}
