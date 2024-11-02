const currentYear = new Date().getFullYear();
document.getElementById("footer-text").textContent = `@${currentYear}`;


function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none'
}


document.addEventListener("DOMContentLoaded", function () {
    loadMenuItems();
    loadBranches();
    
    const enquiryForm = document.getElementById('enquiry-form');
    if(enquiryForm != null){
        enquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            document.getElementById('form-notification').style.display = 'block';
            enquiryForm.reset(); 
        });
    }
});

function loadMenuItems() {
    const mealsContainer = document.getElementById('meals-container');
    const beveragesContainer = document.getElementById('beverages-container');

    if(mealsContainer && beveragesContainer != null){
        fetch('../xml/menu.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const meals = data.getElementsByTagName('meal');
            const beverages = data.getElementsByTagName('beverage');

            Array.from(meals).forEach(meal => {
                const name = meal.getElementsByTagName('name')[0].textContent;
                const price = meal.getElementsByTagName('price')[0].textContent;
                const description = meal.getElementsByTagName('description')[0].textContent;
                const image = meal.getElementsByTagName('image')[0].textContent;            

                mealsContainer.innerHTML += `
                <div class="meal-item">
                    <img src="../${image}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p class="price">Price: $${price}</p>
                </div>`;
            });

            Array.from(beverages).forEach(beverage => {
                const name = beverage.getElementsByTagName('name')[0].textContent;
                const price = beverage.getElementsByTagName('price')[0].textContent;
                const description = beverage.getElementsByTagName('description')[0]?.textContent || '';

                beveragesContainer.innerHTML += `
                    <div class="beverage-item">
                        <h3>${name}</h3>
                        <p>${description}</p>
                        <p class="price">Price: $${price}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error loading menu items:', error));
    }
}



function loadBranches() {
    const branchesContainer = document.getElementById('branches-container');

    if(branchesContainer != null){
        fetch('../xml/branches.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const branches = data.getElementsByTagName('branch');

            Array.from(branches).forEach(branch => {
                const address = branch.getElementsByTagName('address')[0].textContent;
                const contact = branch.getElementsByTagName('contact')[0].textContent;
                const openingHours = branch.getElementsByTagName('opening_hours')[0].textContent;
                const mapLink = branch.getElementsByTagName('map_link')[0].textContent;

                branchesContainer.innerHTML += `
                    <div class="branch-item">
                        <h4>${address}</h4>
                        <p>Contact: ${contact}</p>
                        <p>Opening Hours: ${openingHours}</p>
                        <a href="${mapLink}" target="_blank">View on Google Maps</a>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error loading branch information:', error));
    }
}

