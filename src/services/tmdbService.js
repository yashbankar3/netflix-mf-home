import axios from 'axios';

const API_KEY = 'ff473c79e81fdf725226c964858f8759';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const tmdbService = {
    // Get trending movies
    async getTrending(timeWindow = 'week') {
        const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
        return response.data.results;
    },

    // Get popular movies
    async getPopular() {
        const response = await tmdbApi.get('/movie/popular');
        return response.data.results;
    },

    // Get top rated movies
    async getTopRated() {
        const response = await tmdbApi.get('/movie/top_rated');
        return response.data.results;
    },

    // Get now playing movies
    async getNowPlaying() {
        const response = await tmdbApi.get('/movie/now_playing');
        return response.data.results;
    },

    // Get upcoming movies
    async getUpcoming() {
        const response = await tmdbApi.get('/movie/upcoming');
        return response.data.results;
    },

    // Get movies by genre
    async getMoviesByGenre(genreId) {
        const response = await tmdbApi.get('/discover/movie', {
            params: {
                with_genres: genreId,
            },
        });
        return response.data.results;
    },

    // Get movie details
    async getMovieDetails(movieId) {
        const response = await tmdbApi.get(`/movie/${movieId}`, {
            params: {
                append_to_response: 'videos,credits',
            },
        });
        return response.data;
    },

    // Search movies
    async searchMovies(query) {
        const response = await tmdbApi.get('/search/movie', {
            params: {
                query,
            },
        });
        return response.data.results;
    },
};
