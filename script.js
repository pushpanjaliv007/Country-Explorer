document.addEventListener('DOMContentLoaded',()=>{

    const search = document.querySelector('.search');

    //search country
    async function searchCountry(){
        const searchInput = document.getElementById('searchInput').value.trim();
        const resultDiv  = document.getElementById('result'); 
        if(!searchInput){
            alert('please enter a country name');
            return;
        }
        try{
            const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(searchInput)}`);
            if(!response.ok){
                throw new Error('Country not found');
            }
            const data = await response.json();
            const country = data[0];

            //create html content for the country information
            const currencies = Object.values(country.currencies || {}).map((currency)=>{
                return `${currency.name} (${currency.symbol || ''})`;
            }).join(', ');
            const languages = Object.values(country.languages || {}).join(', ');
            resultDiv.innerHTML = `
            <img src="${country.flags?.png || country.flags?.svg || ''}" alt="${country.name?.common || 'Country'} flag" />
            <div class='country-info'>
              <div class='info-item'>
                <h3>Country Name</h3>
                <p>${country.name?.common || 'N/A'}</p>
              </div>
              <div class='info-item'>
                <h3>Capital</h3>
                <p>${country.capital?.[0] || "N/A"}</p>
              </div>
              <div class='info-item'>
                <h3>Population</h3>
                <p>${country.population?.toLocaleString() || 'N/A'}</p>
              </div>
              <div class='info-item'>
                <h3>Currencies</h3>
                <p>${currencies || "N/A"}</p>
              </div>
              <div class='info-item'>
                <h3>Region</h3>
                <p>${country.region || "N/A"}</p>
              </div>
              <div class='info-item'>
                <h3>Languages</h3>
                <p>${languages || "N/A"}</p>
              </div>
            </div>
            `;
            resultDiv.classList.remove("hidden");
        } catch (error) {
            console.error(error);
            alert(error.message || 'Something went wrong.');
        }
  }
  //add event
  search.addEventListener("click", searchCountry);
});
