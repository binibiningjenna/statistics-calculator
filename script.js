document.getElementById("statsForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let input = document.getElementById("numbersInput").value;
    let numbers = input
        .split(",")
        .map((num) => parseFloat(num.trim()))
        .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
        alert("Please enter valid numbers");
        return;
    }

    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    const range = Math.max(...numbers) - Math.min(...numbers);

    const frequency = {};
    numbers.forEach((num) => (frequency[num] = (frequency[num] || 0) + 1));
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
        .filter((key) => frequency[key] == maxFreq)
        .map(Number);

    const variance = numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numbers.length;
    const standardDeviation = Math.sqrt(variance);

    const list = `
        <li class="list-group-item"><strong>Mean:</strong> ${mean.toFixed(2)}</li>
        <li class="list-group-item"><strong>Median:</strong> ${median}</li>
        <li class="list-group-item"><strong>Mode:</strong> ${mode.join(", ")}</li>
        <li class="list-group-item"><strong>Range:</strong> ${range}</li>
        <li class="list-group-item"><strong>Variance:</strong> ${variance.toFixed(2)}</li>
        <li class="list-group-item"><strong>Standard Deviation:</strong> ${standardDeviation.toFixed(2)}</li>
        `;

    document.getElementById("resultsList").innerHTML = list;
    document.getElementById("resultsCard").classList.remove("d-none");
});