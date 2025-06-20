// Add click handlers for navigation
document.querySelectorAll('.nav-icon').forEach((icon, index) => {
    icon.addEventListener('click', function() {
        // Remove active class from all icons
        document.querySelectorAll('.nav-icon').forEach(i => i.classList.remove('active'));
        // Add active class to clicked icon
        this.classList.add('active');
        
        // Navigation logic would go here
        console.log(`Navigating to ${index === 0 ? 'Home' : index === 1 ? 'Box' : 'Grid'}`);
    });
});

// Add button click handlers
document.querySelector('.edit-profile-btn').addEventListener('click', function() {
    console.log('Edit Profile clicked');
});

document.querySelector('.add-post-btn').addEventListener('click', function() {
    console.log('Add new post clicked');
});

document.querySelector('.back-arrow').addEventListener('click', function() {
    console.log('Back button clicked');
});

document.querySelector('.settings-icon').addEventListener('click', function() {
    console.log('Settings clicked');
});