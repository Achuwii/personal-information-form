$(document).ready(function() {
    $('.second ol li a.active-2 span').css({
        'border-bottom': '3px solid rgb(0, 183, 255)',
        'padding-bottom': '21px'
    });

    $('.second ol li a').click(function() {
        // Reset the CSS for all elements with class 'active-2'
        $('.second ol li a.active-2 span').css({
            'border-bottom': 'none',
            'padding-bottom': '0px'
        });
        $('.second ol li a.active-2').removeClass('active-2');

        // Apply new styles to the clicked element
        $(this).addClass('active-2');
        $(this).find('span').css({
            'border-bottom': '3px solid rgb(0, 183, 255)',
            'padding-bottom': '21px'
        });
    });

});

let counter = 1;

// Get a reference to the parent element and the button
const phoneNumbersContainer = document.getElementById("phoneNumbers");
const addPhoneNumber = document.getElementById("addPhoneNumber");

// Function to create a new form row
function createFormRow() {
  const formRowHTML = `
    <div id="number${counter}" class="number form-row">
        <div class="form-group col-md-3">
            <select class="form-control" name="countryCode${counter}" id="countryCode${counter}" required>
                <option value="uk">+ 1</option>
                <option value="usa">+ 44</option>
                <option value="australia">+ 61</option>
                <option value="philippines">+ 63</option>
            </select>
        </div>
        <div class="form-group col-md-5">
            <input type="text" class="form-control" name="phoneNumber${counter}" id="phoneNumber${counter}" placeholder="1234567890" required>
        </div>
        <div class="form-group col-md-3">
            <select class="form-control" name="phoneType${counter}" id="phoneType${counter}" required>
                <option value="personal">Personal</option>
                <option value="mobile">Mobile</option>
                <option value="work">Work</option>
            </select>
        </div>
        <div class="form-group col-md-1">
            <i class="fa fa-xmark fa-xl remove-number" onclick="removeNumber('number${counter}')"></i>
        </div>
    </div>
  `;

    const numberDivs = document.querySelectorAll('.number');
    const lastNumber = numberDivs[numberDivs.length - 1];
  
    lastNumber.insertAdjacentHTML('afterend', formRowHTML);

    counter++;
}

// Add a click event listener to the button to create a new form row
addPhoneNumber.addEventListener("click", createFormRow);


// Get the select element for country code
const countryCodeSelect = document.getElementById("countryCode");

// Get the phone number input element
const phoneNumberInput = document.getElementById("phoneNumber");

// Add an event listener to the country code select
countryCodeSelect.addEventListener("change", function () {
    // Get the selected country code
    const selectedCountryCode = countryCodeSelect.value;

    // Update the placeholder text based on the selected country code
    switch (selectedCountryCode) {
        case "uk":
            phoneNumberInput.placeholder = "1234567890";
            break;
        case "usa":
            phoneNumberInput.placeholder = "1234567890";
            break;
        case "australia":
            phoneNumberInput.placeholder = "123456789";
            break;
        case "philippines":
            phoneNumberInput.placeholder = "1234567890";
            break;
        default:
            phoneNumberInput.placeholder = "Enter your phone number";
            break;
    }
});


function removeNumber(numberId) {
    const number = document.getElementById(numberId);
    number.remove();
}