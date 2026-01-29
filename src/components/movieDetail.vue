<script setup>

import { useRoute } from 'vue-router'
import {ApiMovie} from "@/service/api-movie.js";
import {onMounted, ref} from "vue";
import {buildUrlImage} from "@/utils/buildUrlImage.js";

const route = useRoute()
const id = route.params.id
const details = ref([])

const fetchDetails = async () => {
  const response = await ApiMovie.getMovieDetails(id)
  details.value = response
  console.log(response)
}

onMounted(() => {
  fetchDetails()
  console.log(id)
})

</script>

<template>
  <div>
    <h1>{{ details.title }}</h1>
    <img
        :src="buildUrlImage(details.poster_path)"
        :alt="details.title"
    />
    <p>{{details.overview}}</p>
    <div v-for="genre in details.genres" :key="genre.id">
      {{genre.name}}
    </div>
  </div>

</template>

<style scoped>

</style>