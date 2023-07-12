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
            this.f(); // remove font "loadingdone" listener
        }
        connectedCallback(
            // define functions and variables as parameters to save LET declarations

            // FUNCTION: addListener - return a function that removes the listener
            addListener = (
                root,
                event,
                callback,
                _ = root.addEventListener(event, callback) // add listener, saves a return statement
            ) => () => root.removeEventListener(event, callback),

            inner = this.shadowRoot.querySelector("slot"),

            animationFrame,

            // FUNCTION: resizeText - resizes the text
            resizeText = () => {
                cancelAnimationFrame(animationFrame);
                requestAnimationFrame(() =>
                    this.style.fontSize =
                    parseInt(getComputedStyle(inner).fontSize)
                    *
                    (this.clientWidth / inner.scrollWidth) + "px"
                )
            }
        ) {
            // create listeners and removeListener functions
            this.r = addListener(window, "resize", resizeText);
            this.f = addListener(document.fonts, "loadingdone", resizeText);
            //now resize the text on first load
            resizeText();
        }
    }
)