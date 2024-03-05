import { reactive } from "vue";

export const modalstate = reactive({
  title: "",
  algorithm: [],
  isActive: false,
  characteristics: ["Description", "Time Complexity", "Use Case", "Pseudocode"],

  rename(newName) {
    this.title = newName;
  },

  setModalAlgorithm(algoObject) {
    this.algorithm = [
      algoObject.description,
      [
        algoObject.worst_case_time_complexity,
        algoObject.average_time_complexity,
        algoObject.best_case_time_complexity,
      ],
      algoObject.use_case,
      algoObject.pseudocode,
      algoObject.helper_function_pseudocode,
    ];
  },

  togglePseudocode() {
    var tmp = this.algorithm[3];
    this.algorithm[3] = this.algorithm[4];
    this.algorithm[4] = tmp;
  },

  getModalAlgorithm() {
    return this.algorithm;
  },

  getModalAlgorithmElement(index) {
    return this.algorithm[index];
  },

  getCharacteristics() {
    return this.characteristics;
  },

  toggle() {
    this.isActive = !this.isActive;
  },
});
