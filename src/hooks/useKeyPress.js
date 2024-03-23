import { useEffect } from "react";

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