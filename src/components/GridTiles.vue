<script setup>
import { modalstate } from "../modalstate";

const props = defineProps({
  algorithmObjects: Array,
});
const gridWidth = 3;

var index = -1;
var modalCount = 0;

function enableModal(event) {
  modalstate.setModalAlgorithm(props.algorithmObjects[event.currentTarget.id]);
  modalstate.rename(props.algorithmObjects[event.currentTarget.id].name);
  modalstate.toggle();
}

function setID() {
  const id = modalCount;
  modalCount++;
  return id;
}

function incrementIndex() {
  if (index == props.algorithmObjects.length - 1) {
    index = 0;
  } else {
    index++;
  }
  return index;
}

function getIndex() {
  return index;
}
</script>

<style>
.is-parent :hover {
  background-color: hsl(0, 0%, 98%);
  cursor: pointer;
}

.has-line-break {
  white-space: pre-line;
  line-height: 1.125;
}
</style>

<template>
  <div
    v-for="row in Math.floor(props.algorithmObjects.length / gridWidth)"
    :key="row"
    class="tile is-ancestor"
  >
    <div class="tile is-parent" v-for="column in gridWidth" :key="column">
      <article class="tile is-child box" @click="enableModal" :id="setID()">
        <p class="title">
          {{ props.algorithmObjects[incrementIndex()].name }}
        </p>
        <div class="content has-text-left">
          <p class="has-line-break">
            {{ props.algorithmObjects[getIndex()].description }}
          </p>
          <p>
            <strong>Worst Case Time Complexity:</strong>
            {{ props.algorithmObjects[getIndex()].worst_case_time_complexity }}
          </p>
          <p>
            <strong>Use Case:</strong>
            {{ props.algorithmObjects[getIndex()].use_case.split("\n")[0] }}
          </p>
        </div>
      </article>
    </div>
  </div>
  <div
    v-if="props.algorithmObjects.length % gridWidth > 0"
    class="tile is-ancestor"
  >
    <div
      class="tile is-parent is-4"
      v-for="column in props.algorithmObjects.length % gridWidth"
      :key="column"
    >
      <article class="tile is-child box" @click="enableModal" :id="setID()">
        <p class="title">
          {{ props.algorithmObjects[column - 1].name }}
        </p>
        <div class="content has-text-left">
          <p class="has-line-break">
            {{ props.algorithmObjects[column - 1].description }}
          </p>
          <p>
            <strong>Worst case time complexity: </strong
            >{{ props.algorithmObjects[column - 1].worst_case_time_complexity }}
          </p>
          <p>
            <strong>Use Case:</strong>
            {{ props.algorithmObjects[column - 1].use_case.split("\n")[0] }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
