// ======================================
// ARRAY TO STORE FOODS
// ======================================

let foods = [];


// ======================================
// LOAD SAVED FOODS
// ======================================

function loadFoods() {

    const savedFoods =
        localStorage.getItem("foods");

    if (savedFoods) {

        foods = JSON.parse(savedFoods);

        displayFoods();
    }
}


// ======================================
// SAVE TO LOCAL STORAGE
// ======================================

function saveFoods() {

    localStorage.setItem(
        "foods",
        JSON.stringify(foods)
    );
}


// ======================================
// ADD FOOD
// ======================================

function addFood(name, calories) {

    const food = {

        id: Date.now(),

        name: name,

        calories: calories
    };

    foods.push(food);

    saveFoods();

    displayFoods();
}


// ======================================
// DISPLAY FOODS
// ======================================

function displayFoods() {

    const foodList =
        document.getElementById("foodList");

    foodList.innerHTML = "";

    // If no foods exist
    if (foods.length === 0) {

        foodList.innerHTML = `
            <li class="text-center text-gray-500">
                No foods added.
            </li>
        `;
    }

    foods.forEach((food) => {

        const li =
            document.createElement("li");

        li.className =
            "flex justify-between items-center bg-gray-100 p-3 rounded";

        li.innerHTML = `
            <span>
                ${food.name} -
                ${food.calories} Calories
            </span>

            <button
                onclick="removeFood(${food.id})"
                class="bg-red-500 text-white px-3 py-1 rounded"
            >
                Delete
            </button>
        `;

        foodList.appendChild(li);
    });

    updateStatistics();
}


// ======================================
// UPDATE TOTALS
// ======================================

function updateStatistics() {

    // Number of foods
    document.getElementById(
        "foodCount"
    ).textContent = foods.length;

    // Total calories
    const totalCalories =
        foods.reduce(

            (sum, food) =>
                sum + food.calories,

            0
        );

    document.getElementById(
        "totalCalories"
    ).textContent =
        totalCalories;
}


// ======================================
// DELETE FOOD
// ======================================

function removeFood(id) {

    foods = foods.filter(

        food =>
            food.id !== id

    );

    saveFoods();

    displayFoods();
}


// ======================================
// RESET EVERYTHING
// ======================================

function resetFoods() {

    foods = [];

    localStorage.removeItem(
        "foods"
    );

    displayFoods();
}


// ======================================
// FORM EVENT
// ======================================

document
    .getElementById("foodForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "foodName"
                ).value;

            const calories =
                Number(
                    document.getElementById(
                        "foodCalories"
                    ).value
                );

            addFood(
                name,
                calories
            );

            this.reset();
        }
    );


// ======================================
// VIEW ORDERS BUTTON
// ======================================

document
    .getElementById(
        "viewOrdersBtn"
    )
    .addEventListener(
        "click",
        () => {

            const section =
                document.getElementById(
                    "ordersSection"
                );

            section.classList.toggle(
                "hidden"
            );
        }
    );


// ======================================
// RESET BUTTON
// ======================================

document
    .getElementById(
        "resetBtn"
    )
    .addEventListener(
        "click",
        resetFoods
    );


// ======================================
// FETCH API
// ======================================

async function fetchFoodData() {

    try {

        const response =
            await fetch(
                "https://jsonplaceholder.typicode.com/posts/1"
            );

        const data =
            await response.json();

        console.log(
            "Fetched Data:",
            data
        );

    } catch(error) {

        console.error(
            "Fetch Error:",
            error
        );
    }
}

fetchFoodData();


// ======================================
// START APP
// ======================================

loadFoods();