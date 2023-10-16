document.addEventListener("DOMContentLoaded", function () {
    showTab("personal");
});

function showTab(tabName) {
   // Hide all tab content
   document.getElementById("personalTab").style.display = "none";
   document.getElementById("shippingTab").style.display = "none";
   document.getElementById("billingTab").style.display = "none";
   document.getElementById("contactsTab").style.display = "none";

   // Show the selected tab content
   document.getElementById(tabName + "Tab").style.display = "flex";

    // Get all breadcrumb items
    const navItems = document.querySelectorAll('.link');

    // Remove the 'active' class from all breadcrumb items
    navItems.forEach((item) => {
        item.classList.remove('active-2');
    });

    // Add the 'active' class to the selected breadcrumb item
    const selectedBreadcrumbItem = document.getElementById(tabName + "Link");
    selectedBreadcrumbItem.classList.add('active-2');
}