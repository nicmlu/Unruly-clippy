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
                font-size: 32px;
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
              <div id="label"><slot></slot></div>
            </button>
            <br>
            <button><div id="help-button"> Need Help </div></button>
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
    this.helpButton = this.shadowRoot.querySelector("#help-button");
  }

  addEventListeners() {
    this.pressedCallback = this.buttonPressed.bind(this);
    this.button.addEventListener("click", this.pressedCallback);
    this.icon.addEventListener("mouseenter", this.popUp);
    this.shadowRoot.addEventListener("keydown", this.userTyped);
    this.helpButton.addEventListener("click", this.userHelp);
  }

  removeEventListeners() {
    this.button.removeEventListener("click", this.pressedCallback);
    this.icon.removeEventListener("mouseenter", this.popUp);
    this.helpButton.removeEventListener("click", this.userHelp);
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

  userHelp() {
    let text;
    let helpText = prompt("How Can I Help You?");
    if (helpText == null || helpText == "") {
      text = "I guess you got it all figured out!";
    } else {
      text = "Clippy would love to help you with" + " " + helpText;
    }
    alert(text);
  }

  attributeChangedCallback() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.button.style["background-color"] = randomColor;
  }
}

customElements.define("unruly-office-assistant", UnrulyOfficeAssistant);
