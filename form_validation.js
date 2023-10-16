document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("personalform");
  
    form.addEventListener("submit", function (event) {
      let isFormValid = true;
      let countryCode;
      const requiredInputs = form.querySelectorAll("input[required], select[required]");
  
      requiredInputs.forEach(function (input) {
        if (input.id === 'countryCode') {
            countryCode = input.value;
        }
        if (!validateInput(input, countryCode)) {
          isFormValid = false;
        }
      });
  
      if (!isFormValid) {
        event.preventDefault();
      } else {
        alert('You have submitted your information');
      }
    });
  
    // Function to validate an input
    function validateInput(input, country) {
      const value = input.value.trim();
      const label = input.id.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })

      if (input.id === "firstName" && !validateName(value)) {
        alert("Please enter a valid name in the " + label + " field.");
        return false;
      }

      if (input.id === "lastName" && !validateName(value)) {
        alert("Please enter a valid name in the " + label + " field.");
        return false;
      }
  
      // Check email format for email fields
      if (input.type === "email" && !validateEmail(value)) {
        alert("Please enter a valid email address in the email field.");
        return false;
      }
  
      // Check phone number format for phone number fields
      if (input.type === "text" && input.name === "phoneNumber" && country) {
        if (!validatePhoneNumber(value, country)) {
          alert("Please enter a valid phone number in the field with a country code.");
          return false;
        }
      }
  
      return true;
    }
  

    // Function to validate email using a regular expression
    function validateName(name) {
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
        return nameRegex.test(name);
      }

    // Function to validate email using a regular expression
    function validateEmail(email) {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      return emailRegex.test(email);
    }
  
    // Function to validate phone number format with a country code
    function validatePhoneNumber(phoneNumber, country) {
      let phoneRegex;
      phoneNumber = phoneNumber.replace(/ /g,'');
      
      // Define regular expressions or validation rules for different countries
      if (country === "australia") {
        phoneRegex = /\d{9}$/;
      } else {
        phoneRegex = /\d{10}$/;
      } 
  

      return phoneRegex.test(phoneNumber);
    }
  });
  