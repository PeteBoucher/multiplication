var quiz = {
  question: document.getElementById('question'),
  answer: document.getElementById('answer'),
  limit: 10,
  solved: [],

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  correct: function() {
    var attempt = answer.value;
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
      // quiz.addToHistory(questionContainer);
      quiz.addToTable()
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
  addToTable: function() {
    // display solution in the table
    var cell = document.getElementById('cell' + num1 + 'x' + num2);
    cell.innerHTML = solution;
    cell.className = 'solved';

    // record solution to aviod repetition
    quiz.solved[num1][num2] = true;
  },
  gameover: function() {
    window.alert('Congratulations');
  },
  init: function () {
    // count solutions
    var solutions = 0;
    for (var i = quiz.solved.length - 1; i >= 0; i--) {
      var row = quiz.solved[i];
      for (var j = row.length - 1; j >= 0; j--) {
        if (row[j]) { solutions++ };
      };
    };
    if (solutions >= 11 * limit+1) {
      quiz.gameover();
    } else {
      // pick 2 numbers that have not been solved and display them in the DOM
      while (quiz.solved[num1][num2]) {
        num1 = quiz.getRandomInt(0, quiz.limit);
        num2 = quiz.getRandomInt(0, 10);
      };
    };

    answer.value = ''; // reset the aswe field
    answer.select(); // focus on the input to save pointing and clicking

    question.innerHTML = num1 + ' &times; ' + num2 + ' = ';

    // work out the solution and store it for later
    solution = num1 * num2;
  },
  setup: function() {
    // draw empty table
    num1 = num2 = 0;
    var history = document.getElementById('history');
    for (var i = 0; i <= quiz.limit; i++) {
      var row = document.createElement('tr');
      row.id = 'row' + i;
      for (var j = 0; j <= 10; j++) {
        var cell = document.createElement('td');
        cell.id = 'cell' + i + 'x' + j;
        row.appendChild(cell);
      };
      history.appendChild(row);
    };

    // setup behaiviour
    button = document.getElementById('check');
    button.addEventListener('click', quiz.grader, false);

    // imitialise first problem
    quiz.init();
  }
}

quiz.addEvent(window, 'load', quiz.setup());