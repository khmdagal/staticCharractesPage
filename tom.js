const api = './data/data.json';
const tomMainContainer = document.getElementById('mainContainer');

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

    const tomCharacter = data.characters.filter(el => el?.name === 'Tom');
    
  
    const tom = tomCharacter[0];

    if (!tom) {
        console.log('tom character not found');
        return;
    }

    if (!tomMainContainer) {
        console.log('Container with id "mainContainer" not found');
        return;
    }

    const section = document.createElement('div');
    section.className = 'gallery-card';

    section.innerHTML = `
        <div class="${tom.name.toLowerCase()}">
            <strong>${tom.name}</strong>
            <div>${tom.description}</div>
            <img class="gallery-image"  src="${tom.image_url}" alt="${tom.name}">
        </div>
    `;

    tomMainContainer.prepend(section);
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