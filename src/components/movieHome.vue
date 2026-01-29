<script setup>
import {onMounted, ref} from "vue";
import {ApiMovie} from "@/service/api-movie.js";
import {buildUrlImage} from "@/utils/buildUrlImage.js";

const movies = ref([]);

const fetchMovies = async () => {
  const response = await ApiMovie.getPopularMovies()
  movies.value = response.results
}

onMounted(fetchMovies);

</script>

<template>

  <div>
    <h1> Peliculass Populares </h1>
  </div>

  <div class="movies-container">

    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <RouterLink :to="{ path: `/details/${movie.id}` }">
        <img
            :src="buildUrlImage(movie.poster_path)"
            :alt="movie.title"
            class="movie-poster"
        />
        <p class="movie-title">{{movie.title}}</p>

      </RouterLink>

    </div>
  </div>


</template>

<style scoped>

.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: #121212;
}

.movie-card {
  background-color: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.movie-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 3px solid #42b883;
}

.movie-title {
  padding: 1rem;
  margin: 0;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>