/**
 * A button.
 *
 * @element unruly-office-assistant
 */

export default class UnrulyOfficeAssistant extends HTMLElement {
  static get styles() {
    return `
        <style>
            button {
                display: flex;
                font-family: sans-serif;
                font-weight: 500;
                font-size: 24px;
            	cursor: pointer;
                color:#000000;
                border: none;
                border-radius:12px;
                height: 50px;
                justify-content: space-around;
                align-items: center;
            }
            </style>
        `;
  }

  static get markup() {
    return `
            <button id="button-container">
              <div id="icon"><img src="./images/pink-clip.jpg"></div>
              <div id="label"><slot>"Clippy"</slot></div>
            </button>
            <br>
            <button><div id="update-button">Update attributes</div></button>
        `;
  }

  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super();
    const template = document.createElement("template");

    template.innerHTML = this.constructor.styles + this.constructor.markup;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.initializeElements();
  }

  connectedCallback() {
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  initializeElements() {
    this.icon = this.shadowRoot.querySelector("#icon");
    this.button = this.shadowRoot.querySelector("#button-container");
    this.attributesButton = this.shadowRoot.querySelector("#update-button");
  }

  addEventListeners() {
    this.pressedCallback = this.buttonPressed.bind(this);
    this.button.addEventListener("click", this.pressedCallback);
    this.icon.addEventListener("mouseenter", this.popUp);
    this.shadowRoot.addEventListener("keydown", this.userTyped);
    this.attributesButton.addEventListener(
      "click",
      this.attributeChangedCallback()
    );
  }

  removeEventListeners() {
    this.button.removeEventListener("click", this.pressedCallback);
    this.icon.removeEventListener("mouseenter", this.popUp);
    this.attributesButton.removeEventListener(
      "click",
      this.attributeChangedCallback()
    );
  }

  buttonPressed() {
    alert("Hi, My Name is Clippy! I am your Unruly Office Assistant.");
  }

  popUp() {
    alert("I see you scrolling by... I am here to help if needed.");
  }

  userTyped() {
    alert("I can help you type if you'd like!");
  }

  attributeChangedCallback() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.button.style["background-color"] = randomColor;
  }
}

customElements.define("unruly-office-assistant", UnrulyOfficeAssistant);
