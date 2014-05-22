var quiz = {
  question: document.getElementById('question'),
  answer: document.getElementById('answer'),

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  correct: function() {
    attempt = answer.value;
    return attempt == solution;
  },
  grader: function() {
    var questionContainer = question.parentNode;
    grade = document.getElementById('grade');
    if (!grade) {
      grade = document.createElement("span");
      grade.id = 'grade';
    }
    if (quiz.correct()) {
      grade.innerHTML = '';
      quiz.addToHistory(questionContainer);
      quiz.init();
    } else {
      grade = quiz.markWrong(grade);
    }
    questionContainer.appendChild(grade);
  },
  markWrong: function(grade) {
    // highlight the incorrect answer for modification
    answer.select();
    // mark with red x
    grade.innerHTML += " x";
    grade.style.color = 'red';
    grade.className = 'mark';
    return grade;
  },
  addToHistory: function(problem) {
    var history = document.getElementById('history');
    var item = document.createElement('li');
    var solvedProblem = document.createElement('span');
    solvedProblem.innerHTML = question.innerHTML + solution;
    item.appendChild(solvedProblem);
    history.appendChild(item);
  },
  init: function () {
    // pick 2 numbers and display them in the DOM
    num1 = quiz.getRandomInt(0, 10);
    num2 = quiz.getRandomInt(0, 10);

    answer.value = '';
    answer.select(); // focus on the input to save pointing and clicking

    question.innerHTML = num1 + ' &times; ' + num2 + ' = ';

    // work out the solution and store it for later
    solution = num1 * num2;

    // attach behaviour to check button
    button = document.getElementById('check');
    button.addEventListener('click', quiz.grader, false);
  }
}

quiz.addEvent(window, 'load', quiz.init());