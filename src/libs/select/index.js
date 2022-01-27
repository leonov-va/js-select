import "./index.css";

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedValue = options.selectedValue;

    this.#render();
    this.#setup();
  }

  #render() {
    const { data, placeholder } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedValue);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$arrow = this.$el.querySelector(`[data-type="arrow"]`);
    this.$value = this.$el.querySelector(`[data-type="value"]`);
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    switch (type) {
      case "input":
        this.toggle();
        break;
      case "item":
        this.select(event.target.dataset.value);
        break;
      case "backdrop":
        this.close();
        break;
    }
  }

  select(value) {
    this.selectedValue = value;
    this.$value.textContent = this.current.label;

    this.$el
      .querySelectorAll(`[data-type="item"]`)
      .forEach((el) => el.classList.remove("select__item--selected"));
    this.$el
      .querySelector(`[data-value="${value}"]`)
      .classList.add("select__item--selected");

    this.options.onSelect ? this.options.onSelect(this.current) : null;

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add("select--open");
    this.$arrow.classList.remove("fa-chevron-down");
    this.$arrow.classList.add("fa-chevron-up");
  }

  close() {
    this.$el.classList.remove("select--open");
    this.$arrow.classList.add("fa-chevron-down");
    this.$arrow.classList.remove("fa-chevron-up");
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
    this.$el.innerHTML = "";
  }

  get isOpen() {
    return this.$el.classList.contains("select--open");
  }

  get current() {
    return this.options.data.find((item) => item.value === this.selectedValue);
  }
}

// ################################

const getTemplate = (data = [], placeholder, selectedValue) => {
  let text = placeholder ?? "Select";

  const items = data.map((item) => {
    let cls = "";

    if (item.value === selectedValue) {
      text = item.label;
      cls = "select__item--selected";
    }

    return `<li class="select__item ${cls}" data-type="item" data-value="${item.value}">${item.label}</li>`;
  });

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span class="select__value" data-type="value">${text}</span>
      <i class="fa fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join("")}
      </ul>
    </div>
  `;
};
