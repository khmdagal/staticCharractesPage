
const api = './data/data.json';
const cherryMainContainer = document.getElementById('mainContainer');

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

    const cherryCharacter = data.characters.filter(el => el?.name === 'Cherry');
    
    // If Cherry is found, cherryCharacter[0] will be the first match
    const cherry = cherryCharacter[0];

    if (!cherry) {
        console.log('Cherry character not found');
        return;
    }

    if (!cherryMainContainer) {
        console.log('Container with id "mainContainer" not found');
        return;
    }

    const section = document.createElement('div');
    section.className = 'gallery-card';

    section.innerHTML = `
        <div class="${cherry.name.toLowerCase()}">
            <strong>${cherry.name}</strong>
            <div>${cherry.description}</div>
            <img class="gallery-image"  src="${cherry.image_url}" alt="${cherry.name}">
        </div>
    `;

    cherryMainContainer.prepend(section);
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