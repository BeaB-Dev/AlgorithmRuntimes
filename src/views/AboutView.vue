<script setup>
import FooterBar from "../components/FooterBar.vue";
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <NavBar id="gradient" />
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          About <span class="gradient-text">Algorithm Runtimes</span>
        </h1>
        <p>
          This site serves as a place to look up and compare common programming
          algorithms.
        </p>
        <p>It is a work in progress and is updated frequently.</p>
      </div>
    </div>

    <div class="hero-foot"><FooterBar /></div>
  </section>
</template>

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
