// Load the map2 when the page loads
google.maps.event.addDomListener(window, 'load', () => {
    initializeBillingMap();
    handleBillingRadioChange();
  })
  
  let billingCounter = 1;
  let map2;
  let geocoder2;
  let typingTimer2;
  let selectedRadioValue2 = 0;
  const doneTypingInterval2 = 1000;
  
  // Get a reference to the parent element and the button
  const billingContainer = document.getElementById("billingContainer");
  const addBilling = document.getElementById("addBilling");
  
  // Function to create a new form row
  function createBillingFormRow() {
    const formRowHTML = `
      <div class="billing-address">
        <div class="form-group">
          <label for="billingAddress1${billingCounter}">Address Line 1 <span class="required">*</span></label>
          <input type="text" class="form-control" name="billingAddress1${billingCounter}" id="billingAddress1${billingCounter}" required>
        </div>
        <div class="form-group">
          <label for="billingAddress2${billingCounter}">Address Line 2</label>
          <input type="text" class="form-control" name="billingAddress2${billingCounter}" id="billingAddress2${billingCounter}">
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="billingCity${billingCounter}">Suburb/City</label>
            <input type="text" class="form-control" name="billingCity${billingCounter}" id="billingCity${billingCounter}">
          </div>
          <div class="form-group col-md-4">
            <label for="billingState${billingCounter}">State</label>
            <input type="text" class="form-control" name="billingState${billingCounter}" id="billingState${billingCounter}">
          </div>
          <div class="form-group col-md-4">
            <label for="billingPostcode${billingCounter}">Postcode</label>
            <input type="text" class="form-control" name="billingPostcode${billingCounter}" id="billingPostcode${billingCounter}">
          </div>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="billingPrimary" value="${billingCounter}" id="billingPrimary${billingCounter}">
          <label class="form-check-label" for="billingPrimary${billingCounter}">
            Set as Primary
          </label>
        </div>
      </div>
    `;
  
    const addressDivs = document.querySelectorAll('.billing-address');
    const lastAddress = addressDivs[addressDivs.length - 1];
  
    lastAddress.insertAdjacentHTML('afterend', formRowHTML);
  
    const newRadio = document.querySelector(`input[name="billingPrimary"][value="${billingCounter}`);
    newRadio.addEventListener("change", handleBillingRadioChange);
  
    const newPrimaryInputId = 'billingAddress1' + billingCounter;
    const newPrimaryInput = document.getElementById(newPrimaryInputId);
    newPrimaryInput.addEventListener('input', handleBillingAddressInputChange);

    billingCounter++;
  }
  
  function handleBillingRadioChange() {
    const selectedRadio = document.querySelector('input[name="billingPrimary"]:checked');
    selectedRadioValue2 = selectedRadio ? selectedRadio.value : 0;
  
    const addressInputs = document.querySelectorAll('input[id^="billingAddress1"]');
    addressInputs.forEach(input => {
      input.removeEventListener('input', handleBillingAddressInputChange);
    });
  
    const primaryInputId = 'billingAddress1' + (selectedRadioValue2 == 0 ? '' : selectedRadioValue2);
    const primaryInput = document.getElementById(primaryInputId);
    primaryInput.addEventListener('input', handleBillingAddressInputChange);
  
    performBillingGeocode(primaryInputId);
  
    const radioButtons = document.querySelectorAll('input[name="billingPrimary"]');
    radioButtons.forEach(radio => {
      radio.addEventListener("change", function () {
        selectedRadioValue2 = this.value;
  
        const primaryInputId = 'billingAddress1' + (selectedRadioValue2 == 0 ? '' : selectedRadioValue2);
        const primaryInput = document.getElementById(primaryInputId);
        primaryInput.addEventListener('input', handleBillingAddressInputChange);
  
        performBillingGeocode(primaryInputId);
      });
    });
  }
  
  function handleBillingAddressInputChange() {
    if (this.id === `billingAddress1${selectedRadioValue2 == 0 ? '' : selectedRadioValue2}`) {
      clearTimeout(typingTimer2);
      typingTimer2 = setTimeout(() => {
        performBillingGeocode(this.id);
      }, doneTypingInterval2);
    }
  }
  
  addBilling.addEventListener("click", () => {
    createBillingFormRow();
  });
  
  function initializeBillingMap() {
    map2 = new google.maps.Map(document.getElementById('map2'), {
      center: { lat: 0, lng: 0 },
      zoom: 15
    });
    geocoder2 = new google.maps.Geocoder();
  
    const addressInput = document.getElementById('billingAddress1');
  
    addressInput.addEventListener('input', () => {
      clearTimeout(typingTimer2);
      typingTimer2 = setTimeout(() => {
        performBillingGeocode('billingAddress1');
      }, doneTypingInterval2);
    });
  }
  
  function performBillingGeocode(inputId) {
    if (inputId === `billingAddress1${selectedRadioValue2 == 0 ? '' : selectedRadioValue2}`) {
      const address = document.getElementById(inputId).value;
      geocoder2.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          map2.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map: map2,
            position: results[0].geometry.location
          });
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
  