<!-- takes a prop for its title; when clicked, will open modal with algorithm checklist -->
<script setup>
import { modalstate } from "../modalstate";

const props = defineProps({
  algorithmCategories: Array,
});
</script>

<template>
  <div class="buttons">
    <button
      v-for="category in props.algorithmCategories"
      :key="category"
      class="button is-responsive"
      @click="
        modalstate.toggle();
        modalstate.rename(category);
      "
    >
      {{ category }}
    </button>
  </div>
</template>
