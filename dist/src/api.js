const apiKey = 'ZM6ENCQM2PSRCTY4756JBBP2U';

export async function getWeatherData(location) {
    // Menggunakan URL dari generator yang sudah terverifikasi
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&contentType=json&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            // Jika tetap 404, berarti Key kamu benar-benar belum aktif di server mereka
            throw new Error(`HTTP error! status: ${response.status}. Mohon tunggu 10 menit agar API Key aktif.`);
        }
        
        const data = await response.json();
        console.log("Data Berhasil Diambil:", data);
        return processData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function processData(data) {
    const { address, resolvedAddress, currentConditions, description } = data;
    return {
        address: resolvedAddress || address,
        tempC: Math.round(currentConditions.temp), // Generator ini pakai unitGroup=metric, jadi sudah Celsius
        tempF: Math.round((currentConditions.temp * 9/5) + 32),
        condition: currentConditions.conditions,
        humidity: currentConditions.humidity,
        windSpeed: currentConditions.windspeed,
        description: description,
        icon: currentConditions.icon
    };
}