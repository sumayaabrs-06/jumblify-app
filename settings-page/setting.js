// Add click handlers for interactive elements
document.querySelector('.back-arrow').addEventListener('click', function() {
    console.log('Back button clicked');
});

document.querySelectorAll('.setting-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.setting-title').textContent;
        console.log(`Setting clicked: ${title}`);
    });
});

document.querySelector('.logout-button').addEventListener('click', function() {
    console.log('Log out clicked');
});

document.querySelector('.delete-button').addEventListener('click', function() {
    console.log('Delete account clicked');
});