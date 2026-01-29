<script setup>


</script>

<template>

  <header>

    <h1> App Movies by Daquer & Juquer  </h1>

    <nav>

      <input
      type="text"
      placeholder="Buscar">

      <RouterLink
          to="/movies">

        Peliculas +18 🦙 🦙


      </RouterLink>


    </nav>

  </header>
  <main>
    <RouterView />
  </main>

</template>

<style scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}


h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #42b883;
}


nav {
  display: flex;
  gap: 20px;
}


nav a {
  text-decoration: none;
  color: #eeeeee;
  font-weight: 500;
  transition: color 0.3s ease;
}


nav a:hover {
  color: #42b883;
}


.router-link-active {
  border-bottom: 2px solid #42b883;
  padding-bottom: 5px;
  color: #42b883;
}

input{

}

</style>