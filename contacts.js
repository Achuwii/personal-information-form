const addContact = document.getElementById("addContact");
let contactCounter = 1;


addContact.addEventListener("click", () => {

    const contactName = document.getElementById("contactName");
    const contactPhone = document.getElementById("contactPhone");
    const contactType = document.getElementById("contactType");
    
    const contactHTML = `
        <div id="contact${contactCounter}" class="contact shadow-lg w-100">
            <i class="fa fa-xmark fa-2xl remove-contact" onclick="removeContact('contact${contactCounter}')"></i>
            <p>${contactName.value}</p>
            <p>${contactPhone.value}</p>
            <p>${contactType.value}</p>
        </div>
    `;
  
    const contactDivs = document.querySelectorAll('.contact');
    const lastContact = contactDivs[contactDivs.length - 1];
  
    if (contactDivs.length) {
        lastContact.insertAdjacentHTML('afterend', contactHTML);
    } else {
        const contactsContainer = document.getElementById("contactsContainer");
        contactsContainer.insertAdjacentHTML('beforeend', contactHTML);
    }
    
    contactCounter++;

    contactName.value = '';
    contactPhone.value = '';
    contactType.value = '';
  });

function removeContact(contactId) {
    const contact = document.getElementById(contactId);
    contact.remove();
}