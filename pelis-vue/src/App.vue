<script setup>
import { ref, watch } from "vue";

// Estados reactivos
const searchQuery = ref("");
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedMovie = ref(null);

// Función para buscar películas
const searchMovies = async () => {
  if (!searchQuery.value.trim()) {
    movies.value = [];
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery.value}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error("Error al buscar películas");
    }

    const data = await response.json();
    movies.value = data.results;
  } catch (err) {
    error.value = err.message;
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

// Función para obtener detalles de una película
const selectMovie = async (movie) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(
        `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error("Error al cargar detalles");
    }

    const data = await response.json();
    selectedMovie.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Función para volver al listado
const backToList = () => {
  selectedMovie.value = null;
};

// Watch para búsqueda automática (opcional)
watch(searchQuery, () => {
  if (searchQuery.value.length > 2) {
    searchMovies();
  } else if (searchQuery.value.length === 0) {
    movies.value = [];
  }
});

// Función auxiliar para formatear la fecha
const formatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="app">
    <h1>🎬 Buscador de Películas</h1>

    <!-- Vista de detalle de película -->
    <div v-if="selectedMovie" class="movie-detail">
      <button @click="backToList" class="back-button">← Volver al listado</button>

      <div class="detail-content">
        <img
            v-if="selectedMovie.poster_path"
            :src="`${IMAGE_BASE_URL}${selectedMovie.poster_path}`"
            :alt="selectedMovie.title"
            class="detail-poster"
        />
        <div v-else class="detail-poster no-image">Sin imagen</div>

        <div class="detail-info">
          <h2>{{ selectedMovie.title }}</h2>

          <div class="rating">
            ⭐ {{ selectedMovie.vote_average?.toFixed(1) || "N/A" }} / 10
          </div>

          <div class="release-date">
            <strong>Fecha de lanzamiento:</strong>
            {{ formatDate(selectedMovie.release_date) }}
          </div>

          <div class="overview">
            <strong>Descripción:</strong>
            <p>{{ selectedMovie.overview || "No hay descripción disponible" }}</p>
          </div>

          <div v-if="selectedMovie.genres" class="genres">
            <strong>Géneros:</strong>
            <span
                v-for="genre in selectedMovie.genres"
                :key="genre.id"
                class="genre-tag"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de búsqueda y listado -->
    <div v-else>
      <!-- Buscador -->
      <div class="search">
        <input
            v-model="searchQuery"
            @keyup.enter="searchMovies"
            class="search-input"
            type="text"
            placeholder="Busca películas por título..."
        />
        <button @click="searchMovies" class="search-button">Buscar</button>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Cargando películas...</p>
      </div>

      <!-- Mensaje de error -->
      <div v-if="error" class="error">
        ⚠️ {{ error }}
      </div>

      <!-- Lista de películas -->
      <div v-if="!loading && movies.length > 0" class="movies">
        <div
            v-for="movie in movies"
            :key="movie.id"
            @click="selectMovie(movie)"
            class="movie-card"
        >
          <img
              v-if="movie.poster_path"
              :src="`${IMAGE_BASE_URL}${movie.poster_path}`"
              :alt="movie.title"
              class="movie-poster"
          />
          <div v-else class="movie-poster no-image">Sin imagen</div>

          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <div class="movie-rating">⭐ {{ movie.vote_average?.toFixed(1) || "N/A" }}</div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay resultados -->
      <div v-if="!loading && searchQuery && movies.length === 0 && !error" class="no-results">
        No se encontraron películas con ese nombre
      </div>

      <!-- Mensaje inicial -->
      <div v-if="!searchQuery && movies.length === 0 && !loading" class="initial-message">
        👆 Escribe el nombre de una película para comenzar la búsqueda
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  min-height: 100vh;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Estilos del buscador */
.search {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  font-size: 16px;
  border: 2px solid #0f3460;
  border-radius: 8px;
  background-color: #16213e;
  color: #fff;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #e94560;
}

.search-input::placeholder {
  color: #8b92a8;
}

.search-button {
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  background-color: #e94560;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.search-button:hover {
  background-color: #d63651;
  transform: translateY(-2px);
}

.search-button:active {
  transform: translateY(0);
}

/* Estado de carga */
.loading {
  text-align: center;
  padding: 50px;
}

.spinner {
  border: 4px solid #0f3460;
  border-top: 4px solid #e94560;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Mensajes */
.error {
  text-align: center;
  padding: 20px;
  background-color: rgba(233, 69, 96, 0.2);
  border: 2px solid #e94560;
  border-radius: 8px;
  margin: 20px 0;
}

.no-results,
.initial-message {
  text-align: center;
  padding: 50px;
  color: #8b92a8;
  font-size: 1.2rem;
}

/* Lista de películas */
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.movie-card {
  background-color: #16213e;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(233, 69, 96, 0.4);
}

.movie-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f3460;
  color: #8b92a8;
  font-size: 14px;
}

.movie-info {
  padding: 15px;
}

.movie-info h3 {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #fff;
  min-height: 48px;
}

.movie-rating {
  color: #ffd700;
  font-weight: bold;
}

/* Vista de detalle */
.movie-detail {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.back-button {
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: #0f3460;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #1a4d7a;
}

.detail-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  background-color: #16213e;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.detail-poster {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
}

.detail-info h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #e94560;
}

.rating {
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 20px;
}

.release-date {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.release-date strong {
  color: #e94560;
}

.overview {
  margin-bottom: 20px;
}

.overview strong {
  display: block;
  color: #e94560;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.overview p {
  line-height: 1.6;
  color: #d1d5db;
}

.genres {
  margin-top: 20px;
}

.genres strong {
  display: block;
  color: #e94560;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.genre-tag {
  display: inline-block;
  background-color: #0f3460;
  padding: 5px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .movies {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>