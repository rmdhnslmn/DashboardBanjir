

document.addEventListener("DOMContentLoaded", function() {
    var areaSelect = document.getElementById('area-select');
    var rainfallChart = null; // Menyimpan objek grafik untuk diperbarui

    // Data curah hujan untuk beberapa wilayah di Jakarta
    var rainfallData = {
        'Jakarta Barat': [120, 100, 150, 80, 130],
        'Jakarta Pusat': [90, 110, 80, 120, 100],
        'Jakarta Selatan': [150, 140, 160, 130, 170],
        'Jakarta Timur': [80, 90, 100, 110, 120],
        'Jakarta Utara': [130, 120, 140, 110, 150]
    };

    // Data prediksi kebanjiran untuk beberapa wilayah di Jakarta
    var floodPredictions = {
        'Jakarta Barat': 'Ya',
        'Jakarta Pusat': 'Tidak',
        'Jakarta Selatan': 'Ya',
        'Jakarta Timur': 'Tidak',
        'Jakarta Utara': 'Ya'
    };

    // Fungsi untuk memperbarui tampilan data curah hujan
    function updateRainfallChart(area) {
        var rainfall = rainfallData[area];
        var days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']; // Misal, mengas
        var context = document.getElementById('rainfall-chart').getContext('2d');
        if (rainfallChart) {
            rainfallChart.destroy(); // Hapus grafik lama sebelum membuat yang baru
        }
        rainfallChart = new Chart(context, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Curah Hujan (mm)',
                    data: rainfall,
                    backgroundColor: '#4e73df'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Fungsi untuk memperbarui tampilan prediksi banjir
    function updateFloodPrediction(area) {
        var floodPrediction = floodPredictions[area];
        var predictionElement = document.getElementById('flood-prediction');
        predictionElement.textContent = floodPrediction;
    }

    // Saat halaman dimuat, perbarui tampilan dengan area yang dipilih pertama kali
    updateRainfallChart(areaSelect.value);
    updateFloodPrediction(areaSelect.value);

    // Tambahkan event listener untuk pemilihan area
    areaSelect.addEventListener('change', function() {
        var selectedArea = areaSelect.value;
        updateRainfallChart(selectedArea);
        updateFloodPrediction(selectedArea);
    });
});

