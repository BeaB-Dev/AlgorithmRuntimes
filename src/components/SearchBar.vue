<script setup>
import { ref } from "vue";
import { algorithms } from "../algorithms";
import { useRouter } from "vue-router";

const router = useRouter();
const input = ref("");

var dropdownIsActive = ref(false);
var inputHasMatch = ref(false);
var similarResults = [];
var sw = ref(screen.width);

function filterSearchTerms() {
  similarResults = algorithms
    .getAlgoNames()
    .filter((algorithm) =>
      algorithm.toLowerCase().includes(input.value.toLowerCase())
    );
  return similarResults;
}

function validateInput() {
  // console.log("validating input");
  if (input.value.length == 0) {
    // console.log("input too short");
  } else if (inputHasMatch.value == false) {
    // console.log("input not a match");
    if (similarResults.length > 0) {
      // console.log("returning results containing " + input.value);
      algorithms.selectedAlgorithms =
        algorithms.getAlgoObjectsByNames(similarResults);
      router.push("/algorithms");
    } else {
      // console.log("sorry, can't go to next page");
    }
  } else {
    // console.log("returning exact result");
    algorithms.selectedAlgorithms = algorithms.getAlgoObjectsByNames([
      input.value,
    ]);
    router.push("/algorithms");
  }
}

function disableDropdown(event) {
  if (event) {
    if (
      event.relatedTarget == null ||
      !event.relatedTarget.className.includes("dropdown-item")
    ) {
      dropdownIsActive.value = false;
      // console.log("dropdown is disabled");
    }
  }
}

function enableDropdown() {
  if (!(dropdownIsActive.value == true)) {
    dropdownIsActive.value = true;
  }
  // console.log("dropdown is enabled");
}
</script>

<style>
.dropdown {
  width: 100%;
  height: 100%;
}
.dropdown-trigger {
  width: 100%;
}
.dropdown-menu {
  width: 100%;
}

.dropdown-item {
  text-indent: 25px;
}

.dropdown-content {
  background-image: linear-gradient(to right, #a778e4, #626dc5);
}
</style>

<template>
  <div
    class="dropdown"
    :class="[dropdownIsActive == false || input.length == 0 ? '' : 'is-active']"
    @focusout="disableDropdown"
  >
    <div class="control has-icons-left dropdown-trigger">
      <input
        class="input"
        v-model="input"
        @keyup.enter="validateInput()"
        @click="enableDropdown()"
        type="text"
        :placeholder="[sw <= 678 ? 'search' : 'search algorithms']"
      />
      <span class="icon is-small is-left">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </span>
    </div>

    <div class="control dropdown-menu">
      <div class="dropdown-content">
        <a
          v-for="algorithm in filterSearchTerms()"
          :key="algorithm"
          tabindex="0"
          class="dropdown-item has-text-left"
          @click="
            algorithms.selectedAlgorithms = algorithms.getAlgoObjectsByNames([
              algorithm,
            ]);
            $router.push('/algorithms');
          "
        >
          {{ algorithm }}
        </a>
        <div
          class="dropdown-item has-text-left"
          v-if="input && !filterSearchTerms().length"
        >
          <p>No results found!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- NEXT: KEY UP AND DOWN OVER DROPDOWN OPTIONS -->
