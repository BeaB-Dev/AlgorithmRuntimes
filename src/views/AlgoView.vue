<script setup>
import { algorithms } from "../algorithms";
import { ref } from "@vue/reactivity";
import GridTiles from "../components/GridTiles.vue";
import NavBar from "../components/NavBar.vue";
import TileModal from "../components/TileModal.vue";
import FooterBar from "../components/FooterBar.vue";

const isFetchingData = ref(algorithms.isFetchingData);
const isError = ref(algorithms.isError);

var algos = ref([]);

function selectPageAlgorithms() {
  if (algorithms.selectedAlgorithms.length > 0) {
    algos.value = algorithms.selectedAlgorithms;
  } else {
    algos.value = algorithms.algorithmObjects;
  }
  return algos.value;
}

algorithms.getAlgos();
</script>

<style>
.gradient-text {
  background: linear-gradient(
    to right,
    rgba(205, 112, 245, 1),
    rgba(34, 86, 172, 1)
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <NavBar id="gradient" />
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <h1><span class="title gradient-text">Algorithm Runtimes</span></h1>
        <h2 class="subtitle">
          View and compare the runtimes of search and sort algorithms
        </h2>
        <div v-if="isFetchingData" class="container has-text-centered">
          Fetching Data...
        </div>
        <div v-else-if="isError">An error occurred.</div>
        <div v-else class="section">
          <div class="container has-text-centered">
            <GridTiles :algorithm-objects="selectPageAlgorithms()" />
            <TileModal />
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <FooterBar />
    </div>
  </section>
</template>
