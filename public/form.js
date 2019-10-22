(function() {
    const myQuestions = [
      {
        question: "Which would you rather hear from someone you know?",
        answers: {
          physicalTouch: "Give me a hug!",
          wordsOfAffirmation: "You are terrific!",
        }
      },
      {
        question: "Which would you rather hear from someone you know?",
        answers: {
          receivingGifts: "I’ve got a special birthday present for you!",
          actsOfService: "I’ll help you with your project."
        }
        },
      {
        question: "Which would you rather hear from someone you know?",
        answers: {
          qualityTime: "Let’s go to a movie.",
          physicalTouch: "Can I hold your hand?"
        }
        },
      {
        question: "Which would you rather hear from someone you know?",
        answers: {
          wordsOfAffirmation: "You are so smart!",
          receivingGifts: "Have you made your Christmas list?",
        }
        },
      {
        question: "Which would you rather hear from someone you know?",
        answers: {
          actsOfService: "Would you help me cook dinner?",
          qualityTime: "I like going to fun places with you!",
        }
        }
    ];
  
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (type in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<div class="radio"> <label class="container">
               <input type="radio" name="question${questionNumber}" value="${type}" class="form-radio">
                ${currentQuestion.answers[type]}
                <span class="checkmark"></span>
             </label> </div>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
      heartContainer.innerHTML = `<img src="img/heart_bar1.svg" alt="one-heart">`
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let userType = [];
  
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        userType.push(userAnswer);
        console.log(userType);
       
      });
     // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();