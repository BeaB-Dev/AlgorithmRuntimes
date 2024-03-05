<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

var isActive = ref(false);

function toggleActiveClass() {
  isActive.value = !isActive.value;
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/"
          ><span class="icon-text has-text-primary">
            <span class="icon"
              ><font-awesome-icon
                icon="fa-solid fa-laptop-code"
                color="white"
              />
            </span>
            <span>Algorithm Runtimes</span>
          </span></RouterLink
        >

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': isActive }"
          @click="toggleActiveClass"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
      >
        <div class="navbar-end">
          <RouterLink class="navbar-item has-text-primary" to="/"
            >Home</RouterLink
          >
          <RouterLink class="navbar-item has-text-primary" to="/about"
            >About</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>
