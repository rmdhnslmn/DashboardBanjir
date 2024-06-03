async function fetchWeatherApi(url, params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
    return response.json();
}

const params = {
    latitude: -6.2146,
    longitude: 106.8451,
    hourly: ["temperature_2m", "relative_humidity_2m", "rain", "showers", "is_day"],
    timezone: "Asia/Bangkok"
};
const url = "https://api.open-meteo.com/v1/forecast";

fetchWeatherApi(url, params).then(responses => {
    const response = responses;

    console.log(responses);
    const utcOffsetSeconds = response.utc_offset_seconds;
    const hourly = response.hourly;

    function range(start, stop, step) {
        return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    }

    const timeRange = range(Number(hourly.time[0]), Number(hourly.time[hourly.time.length - 1]), hourly.interval)
        .map(t => new Date((t + utcOffsetSeconds) * 1000));

    const weatherData = {
        hourly: {
            time: timeRange,
            temperature2m: hourly.temperature_2m,
            relativeHumidity2m: hourly.relative_humidity_2m,
            rain: hourly.rain,
            showers: hourly.showers,
            isDay: hourly.is_day
        }
    };

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: weatherData.hourly.time.map(t => t.toISOString()),
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: weatherData.hourly.temperature2m,
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Humidity (%)',
                    data: weatherData.hourly.relativeHumidity2m,
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Rain (mm)',
                    data: weatherData.hourly.rain,
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Showers (mm)',
                    data: weatherData.hourly.showers,
                    borderColor: 'purple',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Is Day',
                    data: weatherData.hourly.isDay,
                    borderColor: 'orange',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
    }
});
});