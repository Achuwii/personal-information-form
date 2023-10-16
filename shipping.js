// Load the map when the page loads
google.maps.event.addDomListener(window, 'load', () => {
    initializeShippingMap();
    handleShippingRadioChange();
  })
  
  let shippingCounter = 1;
  let map;
  let geocoder;
  let typingTimer;
  let selectedRadioValue = 0;
  const doneTypingInterval = 1000;
  
  // Get a reference to the parent element and the button
  const shippingContainer = document.getElementById("shippingContainer");
  const addShipping = document.getElementById("addShipping");
  
  // Function to create a new form row
  function createShippingFormRow() {
    const formRowHTML = `
      <div class="shipping-address">
        <div class="form-group">
          <label for="address1${shippingCounter}">Address Line 1 <span class="required">*</span></label>
          <input type="text" class="form-control" name="address1${shippingCounter}" id="address1${shippingCounter}" required>
        </div>
        <div class="form-group">
          <label for="address2${shippingCounter}">Address Line 2</label>
          <input type="text" class="form-control" name="address2${shippingCounter}" id="address2${shippingCounter}">
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="city${shippingCounter}">Suburb/City</label>
            <input type="text" class="form-control" name="city${shippingCounter}" id="city${shippingCounter}">
          </div>
          <div class="form-group col-md-4">
            <label for="state${shippingCounter}">State</label>
            <input type="text" class="form-control" name="state${shippingCounter}" id="state${shippingCounter}">
          </div>
          <div class="form-group col-md-4">
            <label for="postcode${shippingCounter}">Postcode</label>
            <input type="text" class="form-control" name="postcode${shippingCounter}" id="postcode${shippingCounter}">
          </div>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="shippingPrimary" value="${shippingCounter}" id="shippingPrimary${shippingCounter}">
          <label class="form-check-label" for="shippingPrimary${shippingCounter}">
            Set as Primary
          </label>
        </div>
      </div>
    `;
  
    const addressDivs = document.querySelectorAll('.shipping-address');
    const lastAddress = addressDivs[addressDivs.length - 1];
  
    lastAddress.insertAdjacentHTML('afterend', formRowHTML);
  
    const newRadio = document.querySelector(`input[name="shippingPrimary"][value="${shippingCounter}`);
    newRadio.addEventListener("change", handleShippingRadioChange);
  
    const newPrimaryInputId = 'address1' + shippingCounter;
    const newPrimaryInput = document.getElementById(newPrimaryInputId);
    newPrimaryInput.addEventListener('input', handleShippingAddressInputChange);

    shippingCounter++;
  }
  
  function handleShippingRadioChange() {
    const selectedRadio = document.querySelector('input[name="shippingPrimary"]:checked');
    selectedRadioValue = selectedRadio ? selectedRadio.value : 0;
  
    const addressInputs = document.querySelectorAll('input[id^="address1"]');
    addressInputs.forEach(input => {
      input.removeEventListener('input', handleShippingAddressInputChange);
    });
  
    const primaryInputId = 'address1' + (selectedRadioValue == 0 ? '' : selectedRadioValue);
    const primaryInput = document.getElementById(primaryInputId);
    primaryInput.addEventListener('input', handleShippingAddressInputChange);
  
    performGeocode(primaryInputId);
  
    const radioButtons = document.querySelectorAll('input[name="shippingPrimary"]');
    radioButtons.forEach(radio => {
      radio.addEventListener("change", function () {
        selectedRadioValue = this.value;
  
        const primaryInputId = 'address1' + (selectedRadioValue == 0 ? '' : selectedRadioValue);
        const primaryInput = document.getElementById(primaryInputId);
        primaryInput.addEventListener('input', handleShippingAddressInputChange);
  
        performGeocode(primaryInputId);
      });
    });
  }
  
  function handleShippingAddressInputChange() {
    if (this.id === `address1${selectedRadioValue == 0 ? '' : selectedRadioValue}`) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        performGeocode(this.id);
      }, doneTypingInterval);
    }
  }
  
  addShipping.addEventListener("click", () => {
    createShippingFormRow();
  });
  
  function initializeShippingMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 15
    });
    geocoder = new google.maps.Geocoder();
  
    const addressInput = document.getElementById('address1');
  
    addressInput.addEventListener('input', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        performGeocode('address1');
      }, doneTypingInterval);
    });
  }
  
  function performGeocode(inputId) {
    if (inputId === `address1${selectedRadioValue == 0 ? '' : selectedRadioValue}`) {
      const address = document.getElementById(inputId).value;
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
  