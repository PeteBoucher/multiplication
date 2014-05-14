var quiz = {
  question: document.getElementById('question'),
  answer: document.getElementById('answer'),

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  check: function() {
    attempt = answer.value;
    return attempt == solution;
  },
  grader: function() {
    var questions = document.getElementsByClassName('quiz-question');
    previousGrade = document.getElementById('grade');
    if (previousGrade) {
      previousGrade.id = '';
      previousGrade.innerHTML = " .";
      previousGrade.style.color = 'gray';
    } else {
      grade = document.createElement("span");
      grade.id = 'grade';
    }
    var spantext = '';
    if (quiz.check()) {
      quiz.clearMarks;
      quiz.addToHistory(questions[0]);
      quiz.init();
    } else {
      grade = quiz.markWrong(grade);
    }
    questions[0].appendChild(grade);
  },
  clearMarks: function() {
    marks = document.getElementsByClassName('mark');
    grade.parentNode.removeChild(grade);
    for (var i = marks.length - 1; i >= 0; i--) {
      marks[i].parentNode.removeChild(marks[i]);
    };
  },
  markWrong: function(grade) {
    // highlight the incorrect answer for modification
    answer.select();
    // mark with red x
    grade.innerHTML = " x";
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
    num1 = quiz.getRandomInt(0, 8);
    num2 = quiz.getRandomInt(0, 10);

    answer.value = '';

    question.innerHTML = num1 + ' &times; ' + num2 + ' = ';

    // work out the solution and store it for later
    solution = num1 * num2;

    // attach behaviour to check button
    button = document.getElementById('check');
    button.addEventListener('click', quiz.grader, false);
  }
}

quiz.addEvent(window, 'load', quiz.init());