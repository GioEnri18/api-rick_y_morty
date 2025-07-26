// Obtener referencias a elementos del DOM
const charactersContainer = document.getElementById('characters-container');
const loadingMessage = document.getElementById('loading-message');
const noResultsMessage = document.getElementById('no-results-message');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const nameFilterInput = document.getElementById('name-filter');
const statusFilterSelect = document.getElementById('status-filter');
const genderFilterSelect = document.getElementById('gender-filter');
const applyFiltersBtn = document.getElementById('apply-filters');

// Variables para el estado de la aplicación
const API_BASE_URL = 'https://rickandmortyapi.com/api/character';
let currentPageUrl = API_BASE_URL; // URL de la página actual
let nextPageUrl = null;
let prevPageUrl = null;

// --- Funciones de Utilidad ---

/**
 * Muestra el mensaje de cargando y oculta los resultados/mensajes de no resultados.
 */
function showLoading() {
    loadingMessage.classList.remove('hidden');
    charactersContainer.innerHTML = ''; // Limpia los personajes anteriores
    noResultsMessage.classList.add('hidden');
}

/**
 * Oculta el mensaje de cargando.
 */
function hideLoading() {
    loadingMessage.classList.add('hidden');
}

/**
 * Muestra el mensaje de no resultados y oculta los demás.
 */
function showNoResults() {
    noResultsMessage.classList.remove('hidden');
    charactersContainer.innerHTML = '';
    hideLoading();
}

/**
 * Oculta el mensaje de no resultados.
 */
function hideNoResults() {
    noResultsMessage.classList.add('hidden');
}

/**
 * Renderiza un personaje individual en una tarjeta.
 * @param {object} character - El objeto personaje de la API.
 * @returns {string} - El HTML de la tarjeta del personaje.
 */
function createCharacterCard(character) {
    return `
        <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img src="${character.image}" alt="${character.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-bold mb-2 text-green-300">${character.name}</h2>
                <p class="text-gray-300"><strong class="text-gray-400">Estado:</strong> ${character.status}</p>
                <p class="text-gray-300"><strong class="text-gray-400">Especie:</strong> ${character.species}</p>
            </div>
        </div>
    `;
}

/**
 * Renderiza la lista de personajes en el DOM.
 * @param {Array<object>} characters - Array de objetos personaje.
 */
function renderCharacters(characters) {
    if (characters.length === 0) {
        showNoResults();
        return;
    }

    hideNoResults();
    charactersContainer.innerHTML = characters.map(createCharacterCard).join('');
}

/**
 * Habilita o deshabilita los botones de paginación.
 */
function updatePaginationButtons() {
    prevPageBtn.disabled = !prevPageUrl;
    nextPageBtn.disabled = !nextPageUrl;
}

// --- Lógica Principal de Fetch ---

/**
 * Realiza la petición a la API de Rick and Morty y actualiza la UI.
 * @param {string} url - La URL a la que se debe hacer la petición.
 */
async function fetchCharacters(url) {
    showLoading(); // Mostrar mensaje de cargando

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Actualizar URLs de paginación
        nextPageUrl = data.info.next;
        prevPageUrl = data.info.prev;
        updatePaginationButtons();

        renderCharacters(data.results); // Renderizar los personajes
    } catch (error) {
        console.error("Error fetching characters:", error);
        showNoResults(); // Mostrar mensaje de no resultados en caso de error
    } finally {
        hideLoading(); // Ocultar mensaje de cargando
    }
}

// --- Manejo de Eventos ---

/**
 * Construye la URL de la API con los filtros actuales.
 * @returns {string} La URL construida.
 */
function buildFilterUrl() {
    let url = API_BASE_URL + '/?';
    const params = [];

    const name = nameFilterInput.value.trim();
    const status = statusFilterSelect.value;
    const gender = genderFilterSelect.value;

    if (name) {
        params.push(`name=${encodeURIComponent(name)}`);
    }
    if (status) {
        params.push(`status=${encodeURIComponent(status)}`);
    }
    if (gender) {
        params.push(`gender=${encodeURIComponent(gender)}`);
    }

    return url + params.join('&');
}

// Event listener para el botón de aplicar filtros
applyFiltersBtn.addEventListener('click', () => {
    currentPageUrl = buildFilterUrl(); // Establece la URL actual con los filtros
    fetchCharacters(currentPageUrl); // Realiza la búsqueda con los filtros
});

// Event listeners para los botones de paginación
prevPageBtn.addEventListener('click', () => {
    if (prevPageUrl) {
        currentPageUrl = prevPageUrl;
        fetchCharacters(currentPageUrl);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (nextPageUrl) {
        currentPageUrl = nextPageUrl;
        fetchCharacters(currentPageUrl);
    }
});

// --- Inicialización ---

// Cargar los personajes iniciales al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(currentPageUrl);
});