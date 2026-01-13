// Starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Range input for rating in review modal
const rangeInput = document.getElementById("rating");
const rangeOutput = document.getElementById("rangeValue");
rangeOutput.innerHTML = "Your input: " + rangeInput.value;
rangeInput.addEventListener("input", function () {
  rangeOutput.innerHTML = "Your input: " + this.value;
});
