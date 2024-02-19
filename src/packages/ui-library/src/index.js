import { generateRandomColor } from "./utils";
import { h, init } from "snabbdom";
import { propsModule, styleModule, eventListenersModule } from "snabbdom";

const patch = init([propsModule, styleModule, eventListenersModule]);

function MyComponent() {
  const internalState = {
    count: 0,
    backgroundColor: generateRandomColor(),
  };

  const updateInternalState = (newState) => {
    internalState.count = newState.count;
    internalState.backgroundColor =
      newState.backgroundColor || generateRandomColor();
    render(); // Re-render when state changes
    console.log("Internal state changed:", internalState);
  };

  const render = () => {
    if (!element) {
      console.log("Element is null or undefined. Cannot render.");
      return;
    }

    const vNode = h("div", {}, [
      h(
        "h1",
        {
          style: {
            backgroundColor: internalState.backgroundColor,
            padding: "4rem",
            margin: "2rem",
          },
        },
        "UI Library using Snabbdom and Lerna:"
      ),
      h(
        "h1",
        {
          style: {
            backgroundColor: internalState.backgroundColor,
            padding: "4rem",
            margin: "2rem",
          },
        },
        internalState.count
      ), // Initial value of 0
      h(
        "button",
        {
          style: {
            padding: "1rem",
            fontSize: "36px",
            margin: "2rem",
          },
          on: {
            click: () =>
              updateInternalState({
                count: internalState.count + 1,
                backgroundColor: generateRandomColor(),
              }),
          },
        },
        "Add"
      ),
    ]);

    element = patch(element, vNode);
  };

  let element = document.getElementById("root");

  render();
  console.log("Component mounted!");
}

export default MyComponent;
