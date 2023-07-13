customElements.define(
    "fit-text",
    class extends HTMLElement {
        constructor() {
            super()
                .attachShadow({ mode: "open" })
                .innerHTML = `<slot></slot><style>:host{display:inline-block;width:100%;white-space:nowrap}slot{display:inline-block}</style>`;
        }
        disconnectedCallback() {
            // clean up all EventListeners
            this.r(); // remove "resize" listener
            this.l(); // remove font "loadingdone" listener
        }
        connectedCallback(
            // define functions and variables as parameters to save LET declarations

            animationFrame,

            // FUNCTION: resizeText - resizes the text
            resizeText = () => {
                cancelAnimationFrame(animationFrame);
                requestAnimationFrame(() =>
                    this.style.fontSize =
                    parseInt(getComputedStyle(this.shadowRoot.querySelector("slot")).fontSize)
                    *
                    (this.clientWidth / this.shadowRoot.querySelector("slot").scrollWidth) + "px"
                )
            },

            // FUNCTION: addListener - return a function that removes the listener
            addListener = (
                eventName,
                _ = window.addEventListener(eventName, resizeText) // add listener, saves a return statement
            ) => () => window.removeEventListener(eventName, resizeText), // return a function that removes the listener

        ) {
            // create listeners and removeListener functions
            this.r = addListener("resize");
            this.l = addListener("loadingdone");
            //now resize the text on first load
            resizeText();
        }
    }
)