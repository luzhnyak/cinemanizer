import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_MOVI_BASE_URL;
const API_KEY = process.env.REACT_APP_MOVI_API_KEY;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: builder => ({
    fetchTopMovies: builder.query({
      query: () => {
        return {
          url: `/trending/movie/week`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),

    fetchMovies: builder.query({
      query: ({ query = '', page = 1 }) => {
        return {
          url: `/search/movie`,
          params: {
            api_key: API_KEY,
            query: query,
            page: page,
          },
        };
      },
    }),

    fetchMovieById: builder.query({
      query: (id = '') => {
        return {
          url: `/movie/${id}`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),

    fetchMovieCreditsById: builder.query({
      query: (id = '') => {
        return {
          url: `/movie/${id}/credits`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),

    fetchMovieReviewsById: builder.query({
      query: (id = '') => {
        return {
          url: `/movie/${id}/reviews`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),

    fetchMovieVideosById: builder.query({
      query: (id = '') => {
        return {
          url: `/movie/${id}/videos`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),

    fetchPersonById: builder.query({
      query: (personId = '') => {
        return {
          url: `/person/${personId}`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),

    fetchCombinedCreditsById: builder.query({
      query: (personId = '') => {
        return {
          url: `/person/${personId}/combined_credits`,
          params: {
            api_key: API_KEY,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchTopMoviesQuery,
  useFetchMoviesQuery,
  useFetchMovieByIdQuery,
  useFetchMovieCreditsByIdQuery,
  useFetchMovieReviewsByIdQuery,
  useFetchMovieVideosByIdQuery,
  useFetchPersonByIdQuery,
  useFetchCombinedCreditsByIdQuery,
} = api;
