import { useEffect } from "react";

/*
   useKeyPress takes in a keyPress and an action function.
   This allows the component that this custom hook is consumed in to specify which key is pressed and 
   what action will result from that key press
  */ 
export function useKeyPress(keyPress, action) {
    useEffect(
        function () {
          function callback(event) {
            if (event.code.toLowerCase() === keyPress.toLowerCase()) {
              action();
            }
          }
          document.addEventListener("keydown", callback);
    
          return function () {
            document.removeEventListener("keydown", callback);
          };
        },
        [action, keyPress]
      );
}