// JavaScript Document
    function toggleMenu() {
    const menu = document.getElementById('menuItems');
    menu.classList.toggle('active');
}

// Add event listener to each menu item
const menuItems = document.querySelectorAll('#menuItems a');

menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        // Close the menu
        toggleMenu();
        
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    });
});