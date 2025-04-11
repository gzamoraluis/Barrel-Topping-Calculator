document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const so2AmountSpan = document.getElementById('so2Amount');
    const calculationDetailsDiv = document.getElementById('calculationDetails');

    calculateBtn.addEventListener('click', () => {
        const barrelType = parseFloat(document.getElementById('barrelType').value);
        const ppm = parseFloat(document.getElementById('ppm').value);
        const so2Percent = parseFloat(document.getElementById('so2Percent').value);

        if (!barrelType || !ppm || isNaN(ppm) || isNaN(so2Percent)) {
            alert("Please enter valid values for all fields!");
            return;
        }

        // Calculate SO₂ (gallons * ppm * 0.3785 / (SO₂ percentage))
        const so2Ml = Math.round((barrelType * ppm * 0.3785) / so2Percent);
        
        so2AmountSpan.textContent = so2Ml;
        
        calculationDetailsDiv.innerHTML = `
            ${barrelType} gal × ${ppm} ppm × 0.3785 ÷ ${so2Percent}% = ${so2Ml} mL
        `;
        
        resultDiv.classList.remove('hidden');
    });
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
