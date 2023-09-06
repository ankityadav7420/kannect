// JavaScript code here
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

function getPrimesInRange(start, end) {
    const primes = [];
    const normalNumbers = [];

    for (let i = start; i <= end; i++) {
        const startTime = performance.now();
        if (isPrime(i)) {
            primes.push({ number: i, result: 'Prime', time: performance.now() - startTime });
        } else {
            normalNumbers.push({ number: i, result: 'Normal', time: performance.now() - startTime });
        }
    }

    return { primes, normalNumbers };
}

function displayResults(results) {
    const resultTable = document.getElementById('resultTable');
    const tbody = resultTable.querySelector('tbody');
    tbody.innerHTML = '';

    results.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.number}</td>
            <td>${entry.result}</td>
            <td>${entry.time.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}
let results ;
let totalCalculationTime = 0; 
let totalPrimeTime = 0; 
let totalNormalTime = 0; 

function findPrimes() {
    const startRange = parseInt(document.getElementById('start').value);
    const endRange = parseInt(document.getElementById('end').value);

    const { primes, normalNumbers } = getPrimesInRange(startRange, endRange);
     results = [...primes, ...normalNumbers];
    displayResults(results);

    // Calculate total calculation time, total prime calculation time, and total normal calculation time
    totalCalculationTime = results.reduce((total, entry) => total + entry.time, 0);
    totalPrimeTime = primes.reduce((total, entry) => total + entry.time, 0);
    totalNormalTime = normalNumbers.reduce((total, entry) => total + entry.time, 0);

    document.getElementById('totalTime').textContent = totalCalculationTime.toFixed(2);
    const primeCount = primes.length;
    const normalCount = normalNumbers.length;
    document.getElementById('averageTimePrime').textContent = (totalPrimeTime / primeCount).toFixed(2);
    document.getElementById('averageTimeNormal').textContent = (totalNormalTime / normalCount).toFixed(2);
}

let primeDetailsData = [];
let normalDetailsData = [];

function showDetails() {
    primeDetailsData = [];
    normalDetailsData = [];

    const startRange = parseInt(document.getElementById('start').value);
    const endRange = parseInt(document.getElementById('end').value);

    for (let i = startRange; i <= endRange; i++) {
        const startTime = performance.now();
        if (isPrime(i)) {
            primeDetailsData.push({ number: i, time: performance.now() - startTime });
        } else {
            normalDetailsData.push({ number: i, time: performance.now() - startTime });
        }
    }

    showPrimeDetails();
    document.getElementById('detailsPopup').style.display = 'block';
}

function showPrimeDetails() {
    const primeDetailsTable = document.getElementById('primeDetails');
    primeDetailsTable.style.display = 'block';
    const normalDetailsTable = document.getElementById('normalDetails');
    normalDetailsTable.style.display = 'none';

    const primeDetailsTbody = primeDetailsTable.querySelector('tbody');
    primeDetailsTbody.innerHTML = '';

    results.forEach((entry) => {
        if (entry.result === 'Prime') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.number}</td>
                <td>${entry.time.toFixed(2)}</td>
            `;
            primeDetailsTbody.appendChild(row);
        }
    });
}

function showNormalDetails() {
    const primeDetailsTable = document.getElementById('primeDetails');
    primeDetailsTable.style.display = 'none';
    const normalDetailsTable = document.getElementById('normalDetails');
    normalDetailsTable.style.display = 'block';

    const normalDetailsTbody = normalDetailsTable.querySelector('tbody');
    normalDetailsTbody.innerHTML = '';

    results.forEach((entry) => {
        if (entry.result === 'Normal') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.number}</td>
                <td>${entry.time.toFixed(2)}</td>
            `;
            normalDetailsTbody.appendChild(row);
        }
    });
}

function closePopup() {
    document.getElementById('detailsPopup').style.display = 'none';
}
