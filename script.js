document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // This is a placeholder for actual menu functionality.
            // For a simple implementation, you would toggle a class on the nav.
            alert('Mobile menu clicked!'); 
        });
    }

    // --- Quantity Selector Logic ---
    const allQuantitySelectors = document.querySelectorAll('.quantity-selector');

    allQuantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.minus-btn');
        const plusBtn = selector.querySelector('.plus-btn');
        const quantityInput = selector.querySelector('.quantity-input');

        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    });

    // --- Form Submission Logic ---
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission

        const name = orderForm.querySelector('input[name="name"]').value;
        const phone = orderForm.querySelector('input[name="phone"]').value;
        const address = orderForm.querySelector('input[name="address"]').value;
        const quantity = orderForm.querySelector('.quantity-input').value;

        // Simulate order confirmation
        alert(`تم استلام طلبك بنجاح!\n\nالاسم: ${name}\nالكمية: ${quantity}`);
        
        orderForm.reset(); // Clear the form
    });
});
