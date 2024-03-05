<script setup>
import { ref } from "vue";
import { modalstate } from "../modalstate";

// var isActive = ref(true);
// var hopefularray = [true, false, true, false];
// var isActiveIndex = ref(0);

const modalContentSections = 4;
const helperFunctionIndex = 4;
var contentStatusArray = ref(Array(modalContentSections));
var currentSection = ref(0);
var showHelperFunction = ref(false);
// var timeComplexity = modalstate.getModalAlgorithm()[(0, 9)];

for (var i = modalContentSections - 1; i > 0; i--) {
  contentStatusArray.value[i] = false;
}
contentStatusArray.value[0] = true;
// console.log(contentStatusArray);

function activateNextSection() {
  //make everything false
  contentStatusArray.value[currentSection.value] = false;
  if (currentSection.value < modalContentSections - 1) {
    currentSection.value++;
  } else {
    currentSection.value = 0;
  }
  contentStatusArray.value[currentSection.value] = true;
  // console.log(contentStatusArray.value);
  return contentStatusArray.value;
}

function activatePreviousSection() {
  //make everything false
  contentStatusArray.value[currentSection.value] = false;
  if (currentSection.value > 0) {
    currentSection.value--;
  } else {
    currentSection.value = modalContentSections - 1;
  }
  contentStatusArray.value[currentSection.value] = true;
  // console.log("getModalAlgorithm" + contentStatusArray.value);
  return contentStatusArray.value;
}

function toggleHelperFunctionButtonText() {
  showHelperFunction.value = !showHelperFunction.value;
  // console.log("current modal algo:  " + modalstate.getModalAlgorithm());
}

function resetCurrentSection() {
  //make everything false
  contentStatusArray.value[currentSection.value] = false;
  currentSection.value = 0;
  contentStatusArray.value[currentSection.value] = true;
  // console.log(currentSection.value);
}

// function addNewLines(num) {
//   if (modalstate.getCharacteristics()[num] == "Description") {
//     return modalstate.getModalAlgorithm()[num].replaceAll("\\n", "\n\n");
//   } else if (modalstate.getCharacteristics()[num] == "Pseudocode") {
//     return modalstate.getModalAlgorithm()[num];
//   } else {
//     return modalstate.getModalAlgorithm()[num];
//   }
// }

// function bindPseudocodeClass(num) {
//   if (modalstate.getCharacteristics()[num] == "Pseudocode") {
//     return "is-pseudocode has-text-left";
//   } else {
//     return "";
//   }
// }

function showCases() {
  return contentStatusArray.value[1];
}

function modalContent(num) {
  if (modalstate.getCharacteristics()[num] == "Time Complexity") {
    return (
      modalstate.getModalAlgorithm()[num][0] +
      " " +
      modalstate.getModalAlgorithm()[num][1] +
      " " +
      modalstate.getModalAlgorithm()[num][2]
    );
  } else {
    return modalstate.getModalAlgorithm()[num];
  }
}

// console.log("getModalAlgorithm: " + modalstate.getModalAlgorithm()[0]);
</script>

<style>
.has-line-break {
  white-space: pre-line;
}

.is-pseudocode {
  white-space: pre;
}

.is-time-complexity {
  white-space: pre;
}

.is-use-case {
  white-space: pre;
}

/* .modalbox {
  min-width: 500px;
  min-height: 504px;
} */

/* .modalContent{
  
}

.cardContent {
  min-height: 318px;
} */

/* .test {
  min-width: 250px;
  max-width: 400px;
} */
</style>

<template>
  <!-- If unable to pull content for modal from Grid Tiles functions -->
  <div v-if="modalstate.content == ''">fetching data</div>
  <!-- modal content -->
  <div v-else class="modal" :class="[modalstate.isActive ? 'is-active' : '']">
    <div
      class="modal-background"
      @click="
        modalstate.toggle();
        resetCurrentSection();
      "
    ></div>
    <div class="modal-content">
      <div class="card modalbox">
        <header class="card-header">
          <p class="card-header-title title is-centered">
            {{ modalstate.title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile">
              <!-- previous button -->
              <div class="column is-narrow">
                <button
                  class="button is-primary is-large"
                  @click="activatePreviousSection()"
                >
                  <span
                    ><font-awesome-icon icon="fa-solid fa-chevron-left"
                  /></span>
                </button>
              </div>
              <div class="column">
                <div v-for="n in modalContentSections" :key="n">
                  <p v-show="contentStatusArray[n - 1]" class="subtitle">
                    {{ modalstate.getCharacteristics()[n - 1]
                    }}{{ n - 1 == 2 ? "s" : "" }}
                  </p>
                  <!--helper function button-->
                  <div v-show="contentStatusArray[n - 1]">
                    <button
                      class="button is-ghost is-small is-responsive"
                      v-show="
                        modalstate.getCharacteristics()[n - 1] ==
                          'Pseudocode' &&
                        modalstate.getModalAlgorithmElement(
                          helperFunctionIndex
                        ) != ''
                      "
                      @click="
                        modalstate.togglePseudocode();
                        toggleHelperFunctionButtonText();
                      "
                    >
                      {{
                        showHelperFunction
                          ? "view " + modalstate.title + " function"
                          : "view helper function"
                      }}
                    </button>
                  </div>
                </div>
              </div>
              <!-- next button -->
              <div class="column is-narrow">
                <button
                  class="button is-primary is-large"
                  @click="activateNextSection()"
                >
                  <span
                    ><font-awesome-icon icon="fa-solid fa-chevron-right"
                  /></span>
                </button>
              </div>
            </div>
            <div class="columns is-mobile is-vcentered">
              <!-- algorithm content -->
              <div class="column columns is-mobile">
                <div class="column" v-show="currentSection != 0"></div>
                <div
                  class="column has-text-left is-narrow"
                  v-show="showCases()"
                >
                  <strong>Worst Case</strong><br /><strong>Average Case:</strong
                  ><br /><strong>Best Case:</strong>
                </div>
                <!-- assigns style based on section -->
                <div
                  class="column has-text-left"
                  v-for="n in modalContentSections"
                  :key="n"
                  v-show="contentStatusArray[n - 1]"
                  :class="[
                    modalstate.getCharacteristics()[n - 1] == 'Time Complexity'
                      ? 'is-time-complexity is-narrow'
                      : '',
                    modalstate.getCharacteristics()[n - 1] == 'Pseudocode'
                      ? 'is-pseudocode'
                      : '',
                    modalstate.getCharacteristics()[n - 1] == 'Description'
                      ? 'has-line-break'
                      : '',
                    modalstate.getCharacteristics()[n - 1] == 'Use Case'
                      ? 'is-use-case'
                      : '',
                  ]"
                >
                  <!-- main modal text -->
                  {{
                    modalstate.getModalAlgorithm()[n - 1] == undefined
                      ? ""
                      : typeof modalstate.getModalAlgorithm()[n - 1] == "object"
                      ? modalContent(n - 1).replaceAll(" ", "\n")
                      : // : showHelperFunction
                        // ? modalstate.getModalAlgorithmElement(helperFunctionIndex)
                        modalContent(n - 1)
                  }}
                </div>
                <div class="column" v-show="currentSection != 0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="hero box modalbox">
        <p class="title is-spaced">
          {{ modalstate.title }}
        </p>
        <p
          v-for="n in modalContentSections"
          :key="n"
          v-show="contentStatusArray[n - 1]"
          class="subtitle"
        >
          {{ modalstate.getCharacteristics()[n - 1]
          }}{{ n - 1 == 2 ? "s" : "" }}
        </p>
        <div class="hero-body columns is-mobile">
          <div class="column">
            <span class="" @click="activatePreviousSection()"
              ><font-awesome-icon
                icon="fa-solid fa-chevron-left"
                class="button"
            /></span>
          </div>
          <div
            class="column"
            v-for="n in modalContentSections"
            :key="n"
            v-show="contentStatusArray[n - 1]"
            :class="[
              modalstate.getCharacteristics()[n - 1] == 'Time Complexity'
                ? 'is-time-complexity'
                : '',
              modalstate.getCharacteristics()[n - 1] == 'Pseudocode'
                ? 'is-pseudocode'
                : '',
              modalstate.getCharacteristics()[n - 1] == 'Description'
                ? 'has-line-break'
                : '',
              modalstate.getCharacteristics()[n - 1] == 'Use Case'
                ? 'is-use-case'
                : '',
            ]"
          >
            <div class="columns is-mobile">
              <div
                v-show="
                  modalstate.getCharacteristics()[n - 1] == 'Time Complexity'
                "
                class="column has-text-left"
              >
                <p><strong>Worst Case:</strong></p>
                <p><strong>Average Case:</strong></p>
                <p><strong>Best Case:</strong></p>
              </div>
              <div class="column has-text-left">
                {{
                  modalstate.getModalAlgorithm()[n - 1] == undefined
                    ? ""
                    : typeof modalstate.getModalAlgorithm()[n - 1] == "object"
                    ? modalContent(n - 1).replaceAll(" ", "\n")
                    : modalContent(n - 1)
                }}
              </div>
            </div>
          </div>
          <div class="column">
            <span class="level-item" @click="activateNextSection()"
              ><font-awesome-icon
                icon="fa-solid fa-chevron-right"
                class="button"
            /></span>
          </div>
        </div>
      </div> -->
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="
        modalstate.toggle();
        resetCurrentSection();
      "
    ></button>
  </div>
</template>
