var questions = [
    {
        title: "What is the longest river in the United States?",
        choices: ["Colorado River", "Mississippi River", "Missouri River", "Rio Grande River"],
        answer: "Missouri River"
    },
    {
        title: "Death Valley is located in what U.S. state?",
        choices: ["Nevada", "Utah", "California", "Texas"],
        answer: "California"
    },
    {
        title: "What is the tallest mountain in the United States?",
        choices: ["Mount McKinley", "Mount Ranier", "Mount Hood", "Mount Rushmore"],
        answer: "Mount McKinley"
    },
    {
        title: "What is the smallest U.S. state?",
        choices: ["Maine", "Rhode Island", "Maryland", "Delaware"],
        answer: "Rhode Island"
    },
    {
        title: "What is the largest state of the United States? ",
        choices: ["Texas", "California", "Colorado", "Alaska"],
        answer: "Alaska"
    },


];

console.log(questions);


function startquiz() {


  let btn = document.getElementById("startbtn");

  btn.style.display = "none";

  let landpg = document.getElementById("startpg");

  landpg.style.display = "none";


  let quiz = document.getElementById("quizboard");
  quiz.style.display = "block";
  writeButton()
  timer()
}
let timeInterval
let questionPostion = 0
let timeLeft = questions.length * 15
let domTime = document.getElementById('timer')

function writeButton() {
  document.getElementById('actualQuestion').textContent = questions[questionPostion].title
  for (let i = 0; i < 4; i++) {
    let currentButton = document.getElementById('btn' + i)
    currentButton.textContent = questions[questionPostion].choices[i]
    currentButton.onclick = function () { clicked(questions[questionPostion].choices[i]) }
  }
}
function endGame() {
  document.getElementById('actualQuestion').innerHTML = '<h2>Congratulations, you finished!</h2><br> Your final score: ' + timeLeft
  document.getElementById('actualQuestion').setAttribute("style", "font-size: 24px;");
  document.getElementById('answerBtns').innerHTML = 'Enter Initials <input type="text" name="initials" placeholder="Initials" id= "grabInitials"> <button id="submitInitials" type="button" onclick = "scoreResults() "> SUBMIT</button>'
  document.getElementById('answerBtns').setAttribute("style", "border-radius: 10px; color:black; padding: 25px; font-size: 30px; text-align: center; font-family: sans-serif;");
 
}

function clicked(answer) {
  console.log(answer)
  if (answer === questions[questionPostion].answer) {
    console.log('correct')
    alert("You got it!")

  }

  else {
    console.log('wrong')
    timeLeft = timeLeft - 10; 
    alert("Sorry, that's incorrect!");
  }

  questionPostion++
  if (questionPostion === questions.length) {
    clearInterval(timeInterval)
    console.log('your score= ' + timeLeft)
    endGame()
  }
  else {
    writeButton()

  }
}

function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;

    domTime.textContent = 'Seconds left: ' + timeLeft
    if (timeLeft === 0) {
      clearInterval(timeInterval)
      console.log('out of time')
      
    }

  }, 1000);
}


//this is the function that will create local storage for highscore
function scoreResults() {
  // grab user name
  let user = document.getElementById("grabInitials").value;
  // grab highscore
  let score = timeLeft;
  // grab past highscores and users names/Object
  let scoreList = localStorage.getItem("scoreList");
  // current score and name in object    
  console.log(user);
  console.log(score);
  if (scoreList == null) {
    scoreList = {};
  }
  else {
    scoreList = JSON.parse(scoreList);
  }
  //save to local storage
  scoreList[user] = score;
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
  console.log(scoreList);
  
  displayScore()
  }
