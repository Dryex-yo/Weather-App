import { getWeatherData } from './api.js'; 
import { renderWeather, toggleLoading } from './dom.js';

let currentData = null;

const form = document.getElementById('search-form');
const unitCheckbox = document.getElementById('unit-checkbox');
const searchInput = document.getElementById('search-input');
const contentContainer = document.getElementById('content');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const location = searchInput.value.trim();
    
    // 1. Validasi Input Kosong
    if (!location) {
        alert("Please enter a city name.");
        return;
    }

    // 2. Persiapan UI sebelum Fetch
    toggleLoading(true);
    // Kosongkan tampilan lama agar tidak membingungkan user saat loading
    if (contentContainer) contentContainer.innerHTML = ''; 

    try {
        // 3. Ambil data dari API
        currentData = await getWeatherData(location);
        
        // 4. Render hasil (renderWeather sudah menangani jika currentData null)
        renderWeather(currentData, unitCheckbox.checked);
        
    } catch (error) {
        console.error("Controller Error:", error);
        renderWeather(null, unitCheckbox.checked);
    } finally {
        // 5. Matikan loading apapun hasilnya
        toggleLoading(false);
        // Opsional: Clear input setelah search
        // searchInput.value = ''; 
    }
});

// Listener untuk switch Celsius/Fahrenheit
unitCheckbox.addEventListener('change', () => {
    // Hanya render ulang jika sudah ada data yang pernah dicari
    if (currentData) {
        renderWeather(currentData, unitCheckbox.checked);
    }
});