import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faSpinner,
  faStopwatch,
  faLaptopCode,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import "./assets/main.scss";

library.add(
  faMagnifyingGlass,
  faSpinner,
  faStopwatch,
  faLaptopCode,
  faChevronLeft,
  faChevronRight
);

const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
