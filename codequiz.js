var threeMinutes = 60 * 3;
var timer = threeMinutes, minutes, seconds;
        

function startTimer() {
    
    var display = document.querySelector('#time');
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = threeMinutes;
        }
    }, 1000);
}

window.onload = function () {
    startTimer();
};


// pos is position of where the user in the test or which question they're up to
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
// this is a multidimensional array with 4 inner array elements with 5 elements inside them
var questions = [
  {
    question: "What is HTML?", 
    a: "Hypertophy of Medula eLongus",
    b: "HyperText Markup Language",
    c: "A bird",
    d: "A plane",
    answer: "B"
    },
  {
    question: "What is the purpose of Bootstrap?",
    a: "It's generic velcro",
    b: "Nobody has to learn CSS",
    c: "To provide free and open-source CSS framework",
    d: "To keep your boots on",
    answer: "C"
    },
  {
    question: "What is CSS used for?",
    a: "For describing the presentation of a ducoment in a markup language",
    b: "Making things pretty",
    c: "Cutting the grass",
    d: "The Phaaaaantom of the Opera is heeeere",
    answer: "A"
    },
  {
    question: "What command declares the type of text to display?",
    a: "Be html",
    b: "do it",
    c: "do it, now",
    d: "!Doctype html",
    answer: "D"
    }
  ];
// this get function is short for the getElementById function  
function get(x){
  return document.getElementById(x);
}
// this function renders a question for display on the page
function renderQuestion(){
  test = get("test");
  if(pos >= questions.length){
    test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
    get("test_status").innerHTML = "Test completed";
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;
  }
  get("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  
  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;
  // display the question
  test.innerHTML = "<h3>"+question+"</h3>";
  // display the answer options
  // the += appends to the data we started on the line above
  test.innerHTML += "<label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='D'> "+chD+"</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer() '>Submit Answer</button>";
}
function checkAnswer(){
  // use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if(choice == questions[pos].answer){
    //each time there is a correct answer this value increases
    correct++;
  } else {
        timer -= 5;
        console.log(timer);
  }
  
 // changes position of which character user is on
  pos++;
  // then the renderQuestion function runs again to go to next question
  renderQuestion();
}
// Add event listener to call renderQuestion on page load event
window.addEventListener("load", renderQuestion);

