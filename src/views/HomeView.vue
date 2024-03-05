<script setup>
import AlgoCategoryButton from "../components/AlgoCategoryButton.vue";
import { algorithms } from "../algorithms";
import AlgoCategoryModal from "../components/AlgoCategoryModal.vue";
import SearchBar from "../components/SearchBar.vue";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";

const algoCategories = ["Searching Algorithms", "Sorting Algorithms"];

//gets the algorithms via API
algorithms.getAlgos();
</script>

<template>
  <section id="gradient" class="hero is-fullheight">
    <div class="hero-head">
      <NavBar />
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title has-text-primary">Algorithm Runtimes</h1>
        <h2 class="subtitle has-text-grey-lighter">
          View and compare the runtimes of search and sort algorithms
        </h2>
        <div class="columns is-mobile is-centered">
          <div class="column is-half"><SearchBar /></div>
        </div>
        <AlgoCategoryModal />
        <div class="field is-grouped is-grouped-centered">
          <AlgoCategoryButton :algorithm-categories="algoCategories" />
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <FooterBar />
    </div>
  </section>
</template>
