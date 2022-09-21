"use strict";

const quizData = [
    {
        question: 'Выход какого фильма на широкий экран ознаменовал собой начало «эпохи блокбастеров?»',

        a: '«Терминатор» Дж. Кэмерона',
        b: '«Назад в будущее» Р. Земекиса',
        c: '«Звездные войны» Дж. Лукаса',
        d: '«Челюсти» С. Спилберга',

        correct: 'd',
    },
    {
        question: 'Главный герой и его не в меру болтливый напарник выполняют ответственное задание. В конце концов оба обзаводятся семьями',

        a: 'Шрек',
        b: 'Славные парни',
        c: 'Час Пик',
        d: 'Криминальное чтиво',

        correct: 'a',
    },
    {
        question: 'Талантливый математик, не жалея времени, помогает государству в поисках заговорщиков, но оказывается, что все напрасно',

        a: 'Умница Уилл Хантинг',
        b: 'Игра в иммитацию',
        c: 'Игры разума',
        d: 'Супер 30',

        correct: 'c',
    },
    {
        question: 'Это Билли, Вилли и Дилли из мультсериала «Утиные истории». Кто из них носит одежду красного цвета?',

        a: 'Билли',
        b: 'Никто',
        c: 'Вилли',
        d: 'Дилли',

        correct: 'a',
    },
    {
        question: 'Как звали главных злодеев в фильме «Один дома»?',

        a: 'Питер и Стэнли',
        b: 'Гарри и Марвин',
        c: 'Джон и Брэд',
        d: 'Гарри и Рон',

        correct: 'b',
    },
    {
        question: 'Как звали змею, которую победил Гарри в фильме «Гарри Поттер и Тайная комната»?',

        a: 'Василиск',
        b: 'Астерикс',
        c: 'Обелиск',
        d: 'Нагайна',

        correct: 'd',
    },
    {
        question: 'Что написано на Кольце Всевластия?',

        a: 'Одно из девяти колец, сохраняющих надежду',
        b: 'Одно кольцо, чтобы уничтожить Землю. Оно превыше всего. Оно соберет всех вместе и покорит навек',
        c: 'Одно кольцо, чтобы править всеми. Оно главнее всех. Оно соберет всех вместе и заключит во тьме',
        d: 'Спаси и сохрани',

        correct: 'c',
    },
    {
        question: 'Как с языка суахили переводится девиз Тимона и Пумбы «Акуна матата»?',

        a: 'Райская жизнь',
        b: 'Райская пища',
        c: 'Ешь червей',
        d: 'Беззаботная жизнь',

        correct: 'd',
    },
    {
        question: 'Какой главный химический элемент использовал Тони Старк, чтобы создать миниатюрный ядерный реактор?',

        a: 'Плутоний',
        b: 'Уран',
        c: 'Палладий',
        d: 'Титан',

        correct: 'c',
    },
    {
        question: 'Какое из этих заклятий считается непростительным?',

        a: 'Мортмордре',
        b: 'Авада Кевадра',
        c: 'Конфринго',
        d: 'Люмус',

        correct: 'b',
    },
];

const quizEl = document.querySelector('#quiz'),
      answersEls = document.querySelectorAll('.answer'),
      questionEl = document.querySelector('#question'),
      a_text = document.querySelector('#a_text'),
      b_text = document.querySelector('#b_text'),
      c_text = document.querySelector('#c_text'),
      d_text = document.querySelector('#d_text'),
      submitBtn = document.querySelector('#submit');

let currentQuiz = 0,
    score = 0;

loadQuiz();

function loadQuiz() {

    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

function getSelected() {

    let answer = undefined;

    answersEls.forEach(answerEl => {

        if (answerEl.checked) {

            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {

    answersEls.forEach(answerEl => {

        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {

    // check to see the answer
    const answer = getSelected();

    if (answer) {

        if (answer === quizData[currentQuiz].correct) {

            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
    
            loadQuiz();
            
        } else {
    
            quiz.innerHTML = `
                <h2>You answered correctly at ${score} / ${quizData.length} questions</h2>
                <button onclick="location.reload()">Reload quiz?</button>
            `;
        }
    }
});