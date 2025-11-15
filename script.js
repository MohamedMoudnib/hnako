// ========================================
// SMOOTH SCROLL TO FORM
// ========================================
const ctaButtons = document.querySelectorAll('#ctaButton, #ctaButton2');
const orderForm = document.getElementById('orderForm');

ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        orderForm.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ========================================
// COUNTDOWN TIMER (12 HOURS)
// ========================================
function startCountdown() {
    // Check if countdown end time exists in localStorage
    let countdownEnd = localStorage.getItem('countdownEnd');
    
    // If not, create a new countdown (12 hours from now)
    if (!countdownEnd) {
        const now = new Date().getTime();
        const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
        countdownEnd = now + twelveHours;
        localStorage.setItem('countdownEnd', countdownEnd);
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownEnd - now;
        
        // Time calculations
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the countdown
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            localStorage.removeItem('countdownEnd');
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

// Start countdown when page loads
startCountdown();

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================
const orderFormElement = document.getElementById('orderFormElement');

orderFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value.trim();
    const quantity = document.getElementById('quantity').value;
    
    // Validation
    if (!fullName) {
        alert('⚠️ الرجاء إدخال الاسم الكامل');
        document.getElementById('fullName').focus();
        return;
    }
    
    if (!phone) {
        alert('⚠️ الرجاء إدخال رقم الهاتف');
        document.getElementById('phone').focus();
        return;
    }
    
    // Phone validation (Moroccan format)
    const phonePattern = /^(06|07)[0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        alert('⚠️ الرجاء إدخال رقم هاتف صحيح (مثال: 0612345678)');
        document.getElementById('phone').focus();
        return;
    }
    
    if (!city) {
        alert('⚠️ الرجاء اختيار المدينة');
        document.getElementById('city').focus();
        return;
    }
    
    if (!address) {
        alert('⚠️ الرجاء إدخال العنوان الكامل');
        document.getElementById('address').focus();
        return;
    }
    
    if (!quantity) {
        alert('⚠️ الرجاء اختيار الكمية');
        document.getElementById('quantity').focus();
        return;
    }
    
    // Calculate total price
    const pricePerUnit = 299;
    const prices = {
        '1': 299,
        '2': 550,
        '3': 799,
        '4': 1050,
        '5': 1250
    };
    const totalPrice = prices[quantity];
    
    // Create order object
    const orderData = {
        fullName: fullName,
        phone: phone,
        city: city,
        address: address,
        quantity: quantity,
        totalPrice: totalPrice,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('ar-MA'),
        time: new Date().toLocaleTimeString('ar-MA')
    };
    
    // Log to console (for now)
    console.log('📦 طلب جديد:');
    console.log('═══════════════════════════════════');
    console.log('الاسم:', orderData.fullName);
    console.log('الهاتف:', orderData.phone);
    console.log('المدينة:', orderData.city);
    console.log('العنوان:', orderData.address);
    console.log('الكمية:', orderData.quantity);
    console.log('السعر الإجمالي:', orderData.totalPrice + ' درهم');
    console.log('التاريخ:', orderData.date);
    console.log('الوقت:', orderData.time);
    console.log('═══════════════════════════════════');
    console.log('بيانات JSON الكاملة:', JSON.stringify(orderData, null, 2));
    
    // Success message
    alert('✅ تم استلام طلبك بنجاح!\n\nسنتواصل معك خلال 24 ساعة لتأكيد الطلب.\n\nشكراً لثقتك بنا! 🙏');
    
    // Reset form
    orderFormElement.reset();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // TODO: Later integrate with Google Sheets API
    // sendToGoogleSheets(orderData);
});

// ========================================
// ADDITIONAL UI ENHANCEMENTS
// ========================================

// Add loading state to submit button
const submitButton = orderFormElement.querySelector('.submit-button');
let isSubmitting = false;

orderFormElement.addEventListener('submit', () => {
    if (!isSubmitting) {
        isSubmitting = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = '⏳ جاري إرسال الطلب...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            isSubmitting = false;
        }, 2000);
    }
});

// Quantity selector - Update price display
const quantitySelect = document.getElementById('quantity');
if (quantitySelect) {
    quantitySelect.addEventListener('change', (e) => {
        console.log('تم اختيار الكمية:', e.target.value);
    });
}

// Log page load
console.log('🚀 Hnako Landing Page loaded successfully!');
console.log('📋 All form submissions will be logged to console');
console.log('⏰ Countdown timer started (12 hours)');
