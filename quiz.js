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
    // provide feedback
    spantext = " correct!";
    grade.style.color = 'green';
    grade.innerHTML = spantext;
    return grade;
  },
  markWrong: function(grade) {
    // mark with red X
    spantext = " X";
    grade.style.color = 'red';
    grade.innerHTML = spantext;
    return grade;
  },
  init: function () {
    // pick 2 numbers and display them in the DOM
    num1 = quiz.getRandomInt(0, 8);
    num2 = quiz.getRandomInt(0, 10);

    document.getElementById('question').innerHTML = num1 + ' x ' + num2 + ' = ';

    // work out the solution and store it for later
    solution = num1 * num2;
  }
}

quiz.addEvent(window, 'load', quiz.init());