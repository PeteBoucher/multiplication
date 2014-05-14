var quiz = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  check: function() {
    answer = document.getElementById('answer').value;
    return answer == solution;
  },
  grade: function() {
    question = document.getElementById('quiz-question');
    previousGrade = document.getElementById('grade');
    if (previousGrade) {
      previousGrade.id = '';
      previousGrade.innerHTML = " .";
      previousGrade.style.color = 'gray';
    }
    grade = document.createElement("span");
    grade.id = 'grade';
    var spantext = '';
    if (quiz.check()) {
      grade = quiz.markCorrect(grade);
    } else {
      grade = quiz.markWrong(grade);
    }
    question.appendChild(grade);
  },
  markCorrect: function(grade) {
    // Remove the button
    question.removeChild(document.getElementById('check'));
    // show check mark
    grade.innerHTML = " &#x2713;";
    grade.style.color = 'green';
    return grade;
  },
  markWrong: function(grade) {
    // highlight the incorrect answer for modification
    document.getElementById("answer").select();
    // mark with red x
    grade.innerHTML = " x";
    grade.style.color = 'red';
    return grade;
  },
  init: function () {
    // pick 2 numbers and display them in the DOM
    num1 = quiz.getRandomInt(0, 8);
    num2 = quiz.getRandomInt(0, 10);

    document.getElementById('question').innerHTML = num1 + ' &times; ' + num2 + ' = ';

    // work out the solution and store it for later
    solution = num1 * num2;

    // attach behaviour to check button
    button = document.getElementById('check');
    button.addEventListener('click', quiz.grade, false);
  }
}

quiz.addEvent(window, 'load', quiz.init());