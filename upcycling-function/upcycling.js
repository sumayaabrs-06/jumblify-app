/*------------------------------------ (1) Pricing --------------------------------------*/


// Slider functionality
const slider = document.getElementById('price-slider');
const amountDisplay = document.getElementById('amount-display');

function updateSliderBackground() {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${value}%, #ddd ${value}%, #ddd 100%)`;
}

slider.addEventListener('input', function() {
    amountDisplay.textContent = '$' + this.value;
    updateSliderBackground();
});

// Initialize slider appearance
updateSliderBackground();

// Text input functionality
const addonsInput = document.getElementById('addons-input');
const materialsInput = document.getElementById('materials-input');

addonsInput.addEventListener('input', function() {
    console.log('Add-ons:', this.value);
});

materialsInput.addEventListener('input', function() {
    console.log('Additional materials:', this.value);
});

// Navigation functionality
document.getElementById('back-btn').addEventListener('click', function() {
    console.log('Back button clicked');
});

document.getElementById('next-btn').addEventListener('click', function() {
    console.log('Next button clicked');
    console.log('Form data:', {
        addons: addonsInput.value,
        materials: materialsInput.value,
        maxAmount: slider.value
    });
});

document.querySelector('.back-arrow').addEventListener('click', function() {
    console.log('Header back arrow clicked');
});



/*------------------------------------ (2) Box Size --------------------------------------*/

let selectedBox = null;

// Box selection functionality
const boxOptions = document.querySelectorAll('.box-option');
const nextButton = document.getElementById('next-btn');

// Image sources for different states
const imageSources = {
    small: {
        default: 'box-s-off.png', 
        selected: 'box-s-on.png'
    },
    medium: {
        default: 'box-m-off.png',
        selected: 'box-m-on.png'
    },
    large: {
        default: 'box-l-off.png',
        selected: 'box-l-on.png'
    }
};

boxOptions.forEach(box => {
    box.addEventListener('click', function() {
        // Remove selection from all boxes
        boxOptions.forEach(b => {
            b.classList.remove('selected');
            const size = b.getAttribute('data-size');
            const img = b.querySelector('img');
            img.src = imageSources[size].default;
        });

        // Add selection to clicked box
        this.classList.add('selected');
        const size = this.getAttribute('data-size');
        const img = this.querySelector('img');
        img.src = imageSources[size].selected;
        
        // Enable next button (no visual change needed)
        selectedBox = size;
        
        console.log('Selected box size:', size);
    });

    // Add hover effects
    box.addEventListener('mouseenter', function() {
        if (!this.classList.contains('selected')) {
            this.querySelector('img').style.transform = 'scale(1.05)';
        }
    });

    box.addEventListener('mouseleave', function() {
        if (!this.classList.contains('selected')) {
            this.querySelector('img').style.transform = 'scale(1)';
        }
    });
});

// Navigation functionality
document.getElementById('back-btn').addEventListener('click', function() {
    console.log('Back button clicked');
    // Add navigation logic here
});

document.getElementById('next-btn').addEventListener('click', function() {
    if (selectedBox) {
        console.log('Next button clicked with selection:', selectedBox);
        // Add navigation logic here
    }
});

document.querySelector('.back-arrow').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Header back arrow clicked');
    // Add navigation logic here
});

// Add smooth animations
document.addEventListener('DOMContentLoaded', function() {
    boxOptions.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            box.style.transition = 'all 0.5s ease';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});

/*------------------------------------ (3) Inspiration --------------------------------------*/

// Image upload functionality
const imageSlots = document.querySelectorAll('.image-upload-slot');

imageSlots.forEach(slot => {
    const input = slot.querySelector('input[type="file"]');
    const plusIcon = slot.querySelector('.plus-icon');
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                // Remove plus icon
                plusIcon.style.display = 'none';
                
                // Create image element
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded inspiration image';
                
                // Add image to slot
                slot.appendChild(img);
                slot.classList.add('has-image');
                
                console.log('Image uploaded to slot:', slot.dataset.slot);
            };
            reader.readAsDataURL(file);
        }
    });
});

// Navigation functionality
document.getElementById('back-btn').addEventListener('click', function() {
    console.log('Back button clicked');
});

document.getElementById('next-btn').addEventListener('click', function() {
    const notesContent = document.getElementById('notes-textarea').value;
    console.log('Next button clicked');
    console.log('Notes content:', notesContent);
});

document.getElementById('back-arrow').addEventListener('click', function() {
    console.log('Header back arrow clicked');
});

// Notes textarea functionality
const notesTextarea = document.getElementById('notes-textarea');

notesTextarea.addEventListener('input', function() {
    console.log('Notes updated:', this.value);
});

// Auto-resize textarea based on content
notesTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.max(300, this.scrollHeight) + 'px';
});

/*------------------------------------ (4) Receipt --------------------------------------*/

// Checkbox functionality
const checkboxContainer = document.getElementById('checkbox-container');
const customCheckbox = document.getElementById('custom-checkbox');
let isChecked = true; // Start as checked (green tick visible)

// Initialize as checked
customCheckbox.classList.add('checked');

checkboxContainer.addEventListener('click', function () {
    isChecked = !isChecked;
    if (isChecked) {
        customCheckbox.classList.add('checked');
    } else {
        customCheckbox.classList.remove('checked');
    }
});

// Navigation functionality
document.querySelector('.back-arrow').addEventListener('click', function () {
    console.log('Header back arrow clicked');
});

// Pay button functionality
document.getElementById('pay-button').addEventListener('click', function () {
    if (isChecked) {
        console.log('Payment initiated');
        console.log('Form data:', {
            email: document.getElementById('email-input').value,
            phone: document.getElementById('phone-input').value,
            country: document.getElementById('country-select').value,
            cardNumber: document.getElementById('card-number').value,
            cardDate: document.getElementById('card-date').value,
            cardCvc: document.getElementById('card-cvc').value,
            address: document.getElementById('address').value,
            country: document.getElementById('country').value,
            postcode: document.getElementById('postcode').value
        });
        alert('Payment processed successfully!');
    } else {
        alert('Please confirm and agree to all details and costs stated before proceeding.');
    }
});

// Input formatting and validation
document.getElementById('card-number').addEventListener('input', function () {
    let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.value = formattedValue;
});

document.getElementById('phone-input').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('postcode').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

