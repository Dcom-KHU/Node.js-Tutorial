window.addEventListener("DOMContentLoaded", () => {
  let prev = "";
  let cur = "";
  let prev_op = "";
  let isBeingNumber = false;

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      if (this.classList.contains("number")) {
        cur = parseInt(cur + this.innerHTML);
        document.querySelector("#cur").innerHTML = cur;
        isBeingNumber = true;
      } else {
        const op = this.innerHTML;
        if (op === "C") {
          prev = "";
          cur = "";
          prev_op = "";
          document.querySelector("#cur").innerHTML = "";
          document.querySelector("#prev").innerHTML = "";
        } else if (isBeingNumber) {
          if (!!prev_op) {
            switch (prev_op) {
              case "+":
                prev += cur;
                break;
              case "-":
                prev -= cur;
                break;
              case "*":
                prev *= cur;
                break;
              case "/":
                if (cur !== 0) prev /= cur;
                break;
            }
            document.querySelector("#cur").innerHTML = prev;
          } else {
            prev = cur;
          }
          cur = "";
          if (op === "=") {
            prev_op = "";
            document.querySelector("#prev").innerHTML = "";
          } else {
            prev_op = op;
            document.querySelector("#prev").innerHTML = `${prev} ${prev_op}`;
          }
        } else {
          if (op === "=") {
            prev_op = "";
            document.querySelector("#prev").innerHTML = "";
          } else {
            prev_op = op;
            document.querySelector("#prev").innerHTML = `${prev} ${prev_op}`;
          }
        }

        isBeingNumber = false;
      }
      console.log(cur, prev, prev_op);
    });
  });
});
