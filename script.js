// **********************THEME Toggle**********************
var icon = document.querySelector("#icon");
var p = document.querySelector("#toggle-text");
icon.addEventListener('click', function () {
  document.body.classList.toggle("white-theme");
  if (document.body.classList.contains("white-theme")) {
    icon.setAttribute('name', 'moon');
    p.innerHTML = "Dark";
  }
  else {
    icon.setAttribute('name', 'sunny');
    p.innerHTML = "Light";
  }
});


document.addEventListener("DOMContentLoaded", function () {
  // Function to close the modal
  window.closeModal = function () {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  };

  // *****************DropDown************************
  const filterbtn = document.querySelector(".filter");
  const filterOptions = document.querySelectorAll("#myDropdown a");
  const filterText = document.querySelector('.filter span')

  filterbtn.addEventListener('click', function () {
    const dropdownContent = document.querySelector(".dropdown-content");
    if (dropdownContent.style.display === "flex") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "flex";
    }
  });

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    var dropdownContent = document.getElementById("myDropdown");
    if (event.target !== dropdownContent && !event.target.matches('button')) {
      dropdownContent.style.display = "none";
    }
  }

  // ***************fiter****************
  filterOptions.forEach(options => {
    options.addEventListener('click', function (e) {
      e.preventDefault();
      const optionText = options.id;
      filterByContinent(optionText);
      filterText.innerHTML = optionText;
    })
  })

  function filterByContinent(continent) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const regionElement = card.querySelector('.country-desc p:nth-child(2)');
      let region = regionElement.textContent.trim();
      region = region.replace('Region:', '');
      region = region.trim();
      if (region !== continent) {
        card.style.display = 'none';
      }
      else {
        card.style.flexDirection = 'column';
        card.style.display = 'flex';
      }
    });
  }

  // *****************country details*********
  function showCountryDetail(country) {
    const cards = document.querySelectorAll('.card');
    const hero = document.querySelector('.search-div')
    cards.forEach(card => {
      card.style.display = 'none';
      hero.style.display = 'none';
    });
    // adding description page back button
    const backBTN = document.createElement('div');
    backBTN.className = 'back-btn';
    backBTN.innerHTML = `
     <div class="back-btn">
      <button onclick="window.location = 'index.html' "><ion-icon name="arrow-back"></ion-icon> Back</button>
     </div>

    `;
    document.body.appendChild(backBTN);
    // adding description page.
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'country-wrapper';
    detailsContainer.innerHTML = `
    <div class="country-left">
            <img src="${country.flag}" alt="">
    </div>
    <div class="country-right">
        <h2>${country.name}</h2>
            <div class="country-page-desc">
                <div>
                <p>Native name :<span>${country.name}</span></p>
                <p>Population: <span>${country.population}</span></p>
                <p>Region : <span>${country.region}</span></p>
                <p>Sub region :<span>${country.subregion}</span></p>
                <p>Capital : <span>${country.capital}</span></p>
                </div>
                <div>
                <p>Top Level Domain :<span>${country.name}</span></p>
                <p>Currencies: <span>${country.population}</span></p>
                <p>Languages: <span>${country.region}</span></p>
                </div>
            </div>
    </div>
    
    <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/pranavpatilgithub">Pranav Patil</a>.
    </div>
    `;

    document.body.appendChild(detailsContainer);
  }

  // *****************function for searching********************
  function SearchByCountry(key) {
    const cards = document.querySelectorAll('.card');
    let check = key.toLowerCase();
    check = check.trim();
    cards.forEach(card => {
      const name = card.querySelector('.card h2');
      const countryName = name.textContent.toLowerCase();
      if (check === countryName) {
        card.style.flexDirection = 'column';
        card.style.display = 'flex';
      }
      else {
        card.style.display = 'none';
      }
    });
  }

  const searchInput = document.querySelector('.search-bar input');
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const searchKey = e.target.value;
      SearchByCountry(searchKey);
    }
  });
// fetch from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const cardsContainer = document.querySelector('.card-wrapper');

      // Loop through each country in the data
      data.forEach(country => {
        // Create a card element
        const card = document.createElement('div');
        card.className = 'card';
        const flag = document.createElement('div');
        flag.className = 'flag';
        card.appendChild(flag);

        // Populate card with country information
        flag.innerHTML = `
                    <img src="${country.flag}" alt="${country.name} Flag">
                   
                `;

        const text = document.createElement('h2');
        text.innerHTML = `${country.name}`;
        card.appendChild(text);

        // const cardText = card.querySelector();
        const cardText = document.createElement('div')
        cardText.className = 'country-desc';
        cardText.innerHTML = `
                <p>Population: <span> ${country.population} </span></p>
                <p>Region: <span> ${country.region} </span></p>
                <p>Capital: <span> ${country.capital}</span></p>
                `
        card.appendChild(cardText);

        card.addEventListener('click', function () {
          showCountryDetail(country);
        });
        cardsContainer.appendChild(card);

      });

    })

});

