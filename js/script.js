let form = document.querySelector('#travelForm');
let table = document.querySelector('.myTable table');
let countryCounter = 0;
let countryRecords = [];

const displayRecords = () => {
    const table = document.querySelector('.myTable table');
    const cardContainer = document.getElementById('cardContainer');

    // Table rendering
    table.innerHTML = `
        <tr>
            <th>Country Visited</th>
            <th>Date Visited</th>
            <th>Rating</th>
            <th>Action</th>
        </tr>
    `;

    // Card rendering
    cardContainer.innerHTML = '';

    countryRecords.forEach((record, index) => {
        // Table Row
        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${record.Country}</td>
                <td>${record.dateVisited}</td>
                <td>${record.Rating}</td>
                <td><button onclick="removeRecord(${index})">Delete</button></td>
            </tr>`
        );

        // Flag image fallback to placeholder if not found
        let imgSrc = `flags/${record.Country.toLowerCase()}.png`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image">
                <img src="${imgSrc}" onerror="this.src='images/placeholder.png'" alt="${record.Country}" />
            </div>
            <div class="text">
                <h2>${record.Country}</h2>
                <p>Date Visited: ${record.dateVisited}</p>
                <p>Rating: ${record.Rating}/10</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    document.getElementById("countryCount").textContent = `You have visited: ${countryCounter} countries.`;
};

const removeRecord = (index) => {
    countryRecords.splice(index, 1);
    countryCounter--;
    displayRecords();
};

const addRecord = (evt) => {
    evt.preventDefault();
    let newRecord = {
        Country: form.elements['country'].value,
        dateVisited: form.elements['dateVisited'].value,
        Rating: form.elements['Rating'].value
    };
    countryRecords.push(newRecord);
    countryCounter++;
    displayRecords();
    form.reset();
};

form.addEventListener('submit', addRecord);

// Search
const search = () => {
    let searchFor = document.getElementById("search").value.toLowerCase();
    let error = document.getElementById("error");

    if (!searchFor) return error.style.display = "none";

    let found = countryRecords.find(c => c.Country.toLowerCase() === searchFor);
    if (found) {
        error.style.display = "none";
        alert(`Country Found:\n${found.Country}\nDate Visited: ${found.dateVisited}\nRating: ${found.Rating}`);
    } else {
        error.style.display = "block";
    }
};
