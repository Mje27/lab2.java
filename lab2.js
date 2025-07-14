const form = document.getElementById("registrationForm");

function isStrongPassword(pw) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function calculateAge(dobStr) {
  const dob = new Date(dobStr);
  const ageDiff = Date.now() - dob.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Live feedback handler
function validateField(id, validatorFn, errorMsg) {
  const input = document.getElementById(id);
  const errorDiv = document.getElementById(id + "Error");

  input.addEventListener("input", () => {
    if (validatorFn(input.value)) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      errorDiv.textContent = "";
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
      errorDiv.textContent = errorMsg;
    }
  });
}

// Live validation rules
validateField("username", val => /^[A-Za-z]+$/.test(val), "Username must contain only letters.");
validateField("phone", isValidPhone, "Enter a valid 10-digit phone number.");
validateField("password", isStrongPassword, "Weak password. Must include uppercase, lowercase, number, special char.");

document.getElementById("confirmPassword").addEventListener("input", () => {
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const error = document.getElementById("confirmPasswordError");
  const input = document.getElementById("confirmPassword");

  if (confirm === pass) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    error.textContent = "";
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
    error.textContent = "Passwords do not match.";
  }
});

document.getElementById("dob").addEventListener("change", () => {
  const dob = document.getElementById("dob").value;
  const error = document.getElementById("dobError");
  const input = document.getElementById("dob");
  if (dob && calculateAge(dob) >= 18) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    error.textContent = "";
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
    error.textContent = "You must be at least 18 years old.";
  }
});

// Final submission check
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = ["username", "dob", "phone", "password", "confirmPassword"];
  const allValid = fields.every(id => document.getElementById(id).classList.contains("valid"));
  const accountType = document.getElementById("accountType").value;

  if (allValid && accountType) {
    alert(`You have successfully registered as a ${accountType}.`);
    form.reset();
    fields.forEach(id => {
      document.getElementById(id).classList.remove("valid");
    });
  } else {
    alert("Please correct the highlighted fields.");
  }
});
