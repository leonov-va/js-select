import "./index.sass";
import { Select } from "./libs/select/index.js";

const select = new Select("#select", {
  placeholder: "Select lang",
  selectedValue: "2",
  data: [
    { label: "React", value: "1" },
    { label: "Angular", value: "2" },
    { label: "Vue", value: "3" },
    { label: "React Native", value: "4" },
    { label: "Svelte", value: "5" },
  ],
  onSelect(item) {
    console.log("item: ", item);
  },
});
