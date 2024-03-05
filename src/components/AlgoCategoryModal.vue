<!-- takes a prop for algorithm category; text is populated based on prop -->
<script setup>
import { modalstate } from "../modalstate";
import { algorithms } from "../algorithms";
import { ref } from "vue";

var selectedAlgorithms = ref([]);

function clearSelectedAlgos() {
  selectedAlgorithms.value = [];
}
</script>

<style>
.panelItem {
  background-image: linear-gradient(to right, #a778e4, #626dc5);
}

.panelItem:hover {
  background-image: linear-gradient(
    to right,
    rgba(174, 135, 225, 1),
    rgba(112, 122, 197, 1)
  );
}

.panelFooter {
  background-image: linear-gradient(to right, #a778e4, #626dc5);
}
</style>

<template>
  <div class="modal" :class="[modalstate.isActive ? 'is-active' : '']">
    <div
      class="modal-background"
      @click="
        modalstate.toggle();
        clearSelectedAlgos();
      "
    ></div>
    <div class="modal-content">
      <nav class="panel">
        <p class="panel-heading has-text-primary" id="modalgradient">
          {{ modalstate.title }}
        </p>
        <label
          class="panel-block panelItem has-text-primary"
          v-for="algorithm in algorithms.getAlgoNamesByCategory(
            modalstate.title.includes('Search') ? 'search' : 'sort'
          )"
          :key="algorithm"
        >
          <input
            type="checkbox"
            :value="algorithm"
            v-model="selectedAlgorithms"
          />
          {{ algorithm }}
        </label>

        <div class="panel-block panelFooter">
          <button
            class="button is-outlined is-fullwidth"
            :disabled="selectedAlgorithms.length == 0"
            @click="
              algorithms.selectedAlgorithms =
                algorithms.getAlgoObjectsByNames(selectedAlgorithms);
              modalstate.toggle();
              $router.push('/algorithms');
            "
          >
            Select {{ selectedAlgorithms.length }} Algorithm{{
              selectedAlgorithms.length == 1 ? "" : "s"
            }}
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
