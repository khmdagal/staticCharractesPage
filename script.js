const api = './data.json';




const sectionsContainer = document.getElementById('all-sections');
const navActionsContainer = document.getElementById('nav-actions');


async function fetchCharacters() {
    try {
        const response = await fetch(api);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(error);
    }
}

function onClick(path, element) {
    element.addEventListener('click', (e) => {
        const itemName = path.toLowerCase();  
        const dynamicHref = `./${itemName}.html`;


        e.preventDefault();

        window.location.href = dynamicHref;
        element.setAttribute('href', dynamicHref);
        console.log(`Redirecting to: ${dynamicHref}`);
    });
}

async function createNavbar() {
    const data = await fetchCharacters();

    if (!data || !data.characters || !Array.isArray(data.characters)) {
        console.log('No characters data found or characters is not an array');
        return;
    }

    if (!navActionsContainer) {
        console.log('Container with id "nav-actions" not found');
        return;
    }

    data.characters.forEach((item) => {
        const liElement = document.createElement('li');
        liElement.innerHTML = `<a href="./${item.name.toLowerCase()}.html" class="link">${item.name}</a>`;
        navActionsContainer.appendChild(liElement); // Append each section to the container
    });
}

async function createCharacters() {
    const data = await fetchCharacters();

    if (!data || !data.characters || !Array.isArray(data.characters)) {
        console.log('No characters data found or characters is not an array');
        return;
    }

    if (!sectionsContainer) {
        console.log('Container with id "all-sections" not found');
        return;
    }

    data.characters.forEach((item) => {
        const section = document.createElement('div');
        section.className = 'gallery-card';
        section.innerHTML = `
            <div class="${item.name.toLowerCase()}">
                <strong>${item.name}</strong>
                <div>${item.description}</div>
                <img  class="gallery-image"  src="${item.image_url}" alt="${item.name}">
            </div>
        `;
        onClick(`${item.name}`, section);
        sectionsContainer.appendChild(section);

    });
}

createNavbar(); // Create navbar items when page loads
createCharacters(); // Create character sections



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
