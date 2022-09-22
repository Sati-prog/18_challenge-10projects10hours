// "use strict";

const meals = document.querySelector('#meals'),
      favoriteMeals = document.querySelector('.favorite-meals');

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

    console.log(mealData);

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

    meals.append(meal);
}

function addMealsLS(mealId) {

    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealsLS(mealId) {

    const mealIds = getMealsLS();

    localStorage.setItem(
        'mealIds', 
        JSON.stringify(mealIds.filter(id => id !== mealId))
    );
}

function getMealsLS() {

    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

    const mealIds = getMealsLS();

    const meals = [];
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
    `;

    favoriteMeals.append(favMeal);
}