let batchCounter = 1;

function addBatch() {
    batchCounter++;
    const newBatch = document.createElement('div');
    newBatch.className = 'batch-row';
    newBatch.id = 'batchRow' + batchCounter;
    newBatch.innerHTML = `
        <div class="batch-container">
            <div class="batch-count">
                <label>Barrel count</label>
                <input type="number" class="barrel-count" min="1" value="1">
            </div>
            <div class="batch-tag-input">
                <label>Tag (optional)</label>
                <input type="text" class="batch-tag" placeholder="e.g., Merlot">
            </div>
        </div>
        <button type="button" onclick="removeBatch('batchRow${batchCounter}')" class="remove-btn">- Remove</button>
    `;
    document.getElementById('batchInputs').appendChild(newBatch);
}

function removeBatch(id) {
    const batchToRemove = document.getElementById(id);
    if (batchToRemove && document.querySelectorAll('.batch-row').length > 1) {
        batchToRemove.remove();
    } else {
        alert("You need at least one batch!");
    }
}

function calculateTopping() {
    const gallons = parseFloat(document.getElementById("gallons").value);
    
    // Get all batches data
    const batches = [];
    document.querySelectorAll('.batch-row').forEach(row => {
        const count = parseInt(row.querySelector('.barrel-count').value) || 0;
        const tag = row.querySelector('.batch-tag').value.trim();
        
        if (count > 0) {
            batches.push({
                count: count,
                tag: tag
            });
        }
    });

    const totalBarrels = batches.reduce((sum, batch) => sum + batch.count, 0);

    if (!gallons || totalBarrels === 0 || isNaN(gallons)) {
        alert("Please enter valid data!");
        return;
    }

    const gallonsPerBarrel = gallons / totalBarrels;
    document.getElementById("totalBarrels").textContent = totalBarrels;
    document.getElementById("perBarrel").textContent = gallonsPerBarrel.toFixed(4);

    let batchResultsHTML = '';
    let subtractionStepsHTML = '';
    let remainingGallons = gallons;
    let roundedGallons = [];
    let totalRounded = 0;

    // Calculate rounded values for each batch
    batches.forEach((batch, index) => {
        const batchGallons = batch.count * gallonsPerBarrel;
        const rounded = Math.round(batchGallons * 4) / 4; // Round to nearest 0.25
        roundedGallons.push(rounded);
        totalRounded += rounded;
    });

    // Adjust difference in last batch to make sum exact
    const difference = gallons - totalRounded;
    if (difference !== 0 && roundedGallons.length > 0) {
        roundedGallons[roundedGallons.length - 1] += difference;
    }

    // Show results and subtraction steps
    subtractionStepsHTML += `<p>Initial total: ${remainingGallons.toFixed(2)}G</p>`;

    batches.forEach((batch, index) => {
        const rounded = roundedGallons[index];
        const batchTag = batch.tag || '';
        
        batchResultsHTML += `
            <div class="result-item">
                <strong>Batch ${index + 1} (${batch.count} barrels)${batchTag ? `<span class="batch-tag">${batchTag}</span>` : ''}:</strong> 
                ${rounded.toFixed(2)}G
            </div>
        `;

        subtractionStepsHTML += `
            <p>${remainingGallons.toFixed(2)}G - ${rounded.toFixed(2)}G (Batch ${index + 1}) = ${(remainingGallons - rounded).toFixed(2)}G remaining</p>
        `;
        
        remainingGallons -= rounded;
    });

    document.getElementById("batchResults").innerHTML = batchResultsHTML;
    document.getElementById("subtractionSteps").innerHTML = subtractionStepsHTML;
    document.getElementById("result").classList.remove('hidden');
}

// Initialize with one batch
document.addEventListener('DOMContentLoaded', addBatch);
