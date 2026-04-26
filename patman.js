const api = './data.json';
const patmanMainContainer = document.getElementById('mainContainer');

async function fetchCharacters() {
    try {
        const response = await fetch(api);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(error);
    }
}

async function createCharacters() {
    const data = await fetchCharacters();
    
    if (!data || !data.characters || !Array.isArray(data.characters)) {
        console.log('No characters data found or characters is not an array');
        return;
    }

    const patmanCharacter = data.characters.filter(el => el?.name === 'Patman');
    
    // If patman is found, patmanCharacter[0] will be the first match
    const patman = patmanCharacter[0];

    if (!patman) {
        console.log('patman character not found');
        return;
    }

    if (!patmanMainContainer) {
        console.log('Container with id "mainContainer" not found');
        return;
    }

    const section = document.createElement('div');
    section.className = 'gallery-card';

    section.innerHTML = `
        <div class="${patman.name.toLowerCase()}">
            <strong>${patman.name}</strong>
            <div>${patman.description}</div>
            <img class="gallery-image"  src="${patman.image_url}" alt="${patman.name}">
        </div>
    `;

    patmanMainContainer.prepend(section);
}

createCharacters();

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');  
    const navActions = document.getElementById('nav-actions'); 

    
    if (menuToggle) {
        
        menuToggle.addEventListener('click', function () {
            navActions.classList.toggle('hide'); 
            console.log(navActions); 
        });
    }
   
});
