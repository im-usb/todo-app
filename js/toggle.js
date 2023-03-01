function themeToggle() {
    const body = document.body;
    const container = document.getElementById('container');
    const lightButton = document.querySelector('#light-mode');
    const darkButton = document.querySelector('#dark-mode');
    
    // Add click event listener to the light mode button
    lightButton.addEventListener('click', function() {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      container.classList.add('light-mode');
      lightButton.style.display='none';
      darkButton.style.display='block';
    });
    
    // Add click event listener to the dark mode button
    darkButton.addEventListener('click', function() {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      container.classList.remove('light-mode');
      lightButton.style.display='block';
      darkButton.style.display='none';
    });
}


themeToggle();