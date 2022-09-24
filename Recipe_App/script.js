// "use strict";

const mealsEl = document.querySelector('#meals'),
      favoriteMeals = document.querySelector('#favorite-meals'),

      mealPopup = document.querySelector('#meal-popup'),
      mealInfoEl = document.querySelector('#meal-info'),
      popupCloseBtn = document.querySelector('#close-popup'),

      searchTerm = document.querySelector('#search-term'),
      searchBtn = document.querySelector('#search');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const responseData = await response.json(),
          randomMeal = responseData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);

    const responseData = await response.json(),
          meal = responseData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);

    const responseData = await response.json(),
          meals = responseData.meals;

    return meals;
}

function addMeal(mealData, random = false) {

    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random 
                ? `<span class="random">Random Recipe</span>` 
                : ''}
            <img src="${mealData.strMealThumb}" 
                 alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button>
                <i class="fa fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector('.meal-body button');

    btn.addEventListener('click', () => {

        if (btn.classList.contains('active')) {

            removeMealsLS(mealData.idMeal);
            btn.classList.remove('active');

        } else {

            addMealsLS(mealData.idMeal);
            btn.classList.add('active');
        }

        fetchFavMeals();
    });

    meal.addEventListener('click', () => {

        showMealInfo(mealData);
    });

    mealsEl.append(meal);
}

function addMealsLS(mealId) {

    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealsLS(mealId) {

    const mealIds = getMealsLS();

    localStorage.setItem(
        'mealIds', 
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function getMealsLS() {

    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

    favoriteMeals.innerHTML = '';

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {

        const mealId = mealIds[i];

        meal = await getMealById(mealId);

        addMealFav(meal);
    }
}

function addMealFav(mealData) {

    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" 
             alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear">
            <i class="fas fa-window-close"></i>
        </button>
    `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click', () => {

        removeMealsLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener('click', () => {

        showMealInfo(mealData);
    });

    favoriteMeals.appendChild(favMeal);
}

function showMealInfo(mealData) {

    mealInfoEl.innerHTML = '';

    const mealEl = document.createElement('div');

    const ingredients = [];

    for (let i = 1; i < 20; i++) {

        if (mealData['strIngredient'+i]) {

            ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`);

        } else {

            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}"
             alt="${mealData.strMeal}"/>
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click', async () => {

    mealsEl.innerHTML = '';

    const search = searchTerm.value,
          meals = await getMealsBySearch(search);

    if (meals) {

        meals.forEach((meal) => {

            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener('click', () => {

    mealPopup.classList.add('hidden');
});