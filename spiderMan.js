const api = './data.json';
const spiderManMainContainer = document.getElementById('mainContainer');

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

    const spiderManCharacter = data.characters.filter(el => el?.name === 'Spiderman');
    
  
    const spiderMan = spiderManCharacter[0];

    if (!spiderMan) {
        console.log('spiderMan character not found');
        return;
    }

    if (!spiderManMainContainer) {
        console.log('Container with id "mainContainer" not found');
        return;
    }

    const section = document.createElement('div');
    section.className = 'gallery-card';

    section.innerHTML = `
        <div class="${spiderMan.name.toLowerCase()}">
            <strong>${spiderMan.name}</strong>
            <div>${spiderMan.description}</div>
            <img class="gallery-image"  src="${spiderMan.image_url}" alt="${spiderMan.name}">
        </div>
    `;

    spiderManMainContainer.prepend(section);
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
