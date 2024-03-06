import axios from "axios";
import { ref } from "vue";

export const algorithms = {
  algorithmObjects: [],
  selectedAlgorithms: [],
  isFetchingData: ref(false),
  isError: ref(false),

  async getAlgos() {
    this.isFetchingData.value = true;
    try {
      const response = await axios.get(
        "https://algorithm-projectb-app-b4e38abe3588.herokuapp.com/api/v1/algorithms/"
      );
      this.algorithmObjects = response.data;
      this.isFetchingData.value = false;
    } catch (error) {
      this.isError.value = true;
    }
  },

  getAlgoObjectsByNames(names) {
    const algos = [];
    for (var i = 0; i < names.length; i++) {
      for (var j = 0; j < this.algorithmObjects.length; j++) {
        if (this.algorithmObjects[j].name == names[i]) {
          algos.push(this.algorithmObjects[j]);
        }
      }
    }
    return algos;
  },

  getAlgoNames() {
    const algos = [];
    for (var i = 0; i < this.algorithmObjects.length; i++) {
      algos.push(this.algorithmObjects[i].name);
    }
    return algos;
  },

  getAlgoNamesByCategory(category) {
    const algos = [];
    for (var i = 0; i < this.algorithmObjects.length; i++) {
      if (this.algorithmObjects[i].category == category) {
        algos.push(this.algorithmObjects[i].name);
      }
    }
    return algos;
  },
};
