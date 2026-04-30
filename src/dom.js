// src/dom.js

export function renderWeather(data, isFahrenheit) {
    const container = document.getElementById('content');
    const appWrapper = document.getElementById('app');
    
    // 1. Validasi: Jika data null atau undefined (akibat input asal/API error)
    if (!data) {
        container.innerHTML = `
            <div class="weather-card animate-fade-in">
                <p class="error-msg" style="color: #d32f2f; font-weight: bold;">
                    ⚠️ Lokasi tidak ditemukan. <br>
                    <span style="font-weight: normal; font-size: 0.9rem;">Pastikan ejaan benar atau coba kota lain.</span>
                </p>
            </div>
        `;
        // Reset tema ke default jika terjadi error
        updateTheme('default', appWrapper);
        return;
    }

    // Pilih suhu berdasarkan toggle
    const tempValue = isFahrenheit ? data.tempF : data.tempC;
    const unitLabel = isFahrenheit ? '°F' : '°C';
    
    // Update Tema Visual
    updateTheme(data.icon, appWrapper);

    container.innerHTML = `
        <div class="weather-card animate-fade-in">
            <h2 class="location-name">${data.address}</h2>
            <p class="weather-description">${data.description || 'No description available'}</p>
            
            <div class="main-display">
                <span class="temp-big">${tempValue}${unitLabel}</span>
                <img src="./assets/icons/${data.icon}.svg" 
                        alt="${data.condition}" 
                        class="weather-icon"
                        onerror="this.src='./assets/icons/cloudy.svg'"> 
            </div>

            <div class="weather-stats">
                <div class="stat-item">
                    <span class="label">Condition</span>
                    <span class="value">${data.condition}</span>
                </div>
                <div class="stat-item">
                    <span class="label">Humidity</span>
                    <span class="value">${data.humidity}%</span>
                </div>
                <div class="stat-item">
                    <span class="label">Wind Speed</span>
                    <span class="value">${data.windSpeed} km/h</span>
                </div>
            </div>
        </div>
    `;
}

function updateTheme(icon, element) {
    if (!element) return;
    
    // Reset classes
    element.className = '';
    
    // Tambahkan pengaman jika icon undefined
    const iconName = icon ? icon.toLowerCase() : 'default';
    
    if (iconName.includes('rain') || iconName.includes('showers')) {
        element.classList.add('theme-rain');
    } else if (iconName.includes('cloudy')) {
        element.classList.add('theme-cloudy');
    } else if (iconName.includes('clear')) {
        element.classList.add('theme-clear');
    } else if (iconName.includes('snow')) {
        element.classList.add('theme-snow');
    } else {
        element.classList.add('theme-default');
    }
}

export function toggleLoading(show) {
    const loader = document.getElementById('loading');
    if (loader) loader.classList.toggle('hidden', !show);
}