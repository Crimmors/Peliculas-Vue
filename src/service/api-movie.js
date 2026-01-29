import {movieInstance} from "@/http/api-movie.instance.js";

export class ApiMovie {
    static async getPopularMovies(page = 1) {
        const response = await movieInstance.get('/movie/popular', {
            params: {
                language: 'es-ES',
                page: page
            }
        });
        return response.data;
    }

    static async searchMovies(query, page = 1) {
        const response = await movieInstance.get('/search/movie', {
            params: {
                query: query,
                language: 'es-ES',
                page: page
            }
        });
        return response.data;
    }

    static async getMovieDetails(movieId) {
        const response = await movieInstance.get(`/movie/${movieId}`, {
            params: {
                language: 'es-ES'
            }
        });
        return response.data;
    }
}