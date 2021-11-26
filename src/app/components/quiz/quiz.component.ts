import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

class Answer {
  correct: boolean = false;
  title: string = ""
}

interface AnswerInterface {
  value: {
    title: string,
    correct: boolean
  },
  key: string
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public title = 'Quiz';

  public answers: Array<Answer> = [];

  public quizId: string | null;
  public quiz: any = {};
  public quizQuestions: Array<any> = [];

  // Sukuriamas datos objekas
  public today: any = new Date();
  public currentQuestion: number = 0;

  // Kintamasis saugoti kiek % klausimu yra atsakyta
  public progress: number = 0;

  public selectedAnswerKey: any = null;
  public selectedAnswerObj: AnswerInterface = {
    key: "",
    value: {
      title: "",
      correct: false
    }
  };
  public selectedQuestionKey: string = '';

  // Kintamasis, kuriame saugome vartotojo pasirinktus atsakymus
  public userAnswers: Array<any> = [];

  public showResults: boolean = false;

  public userScore : number = 0;

  public questionCount : number = 0;

  constructor(db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router) {
    // Gauname route prametra ID, kad zinotume, kuri quiz mums reikia atvaizduoti
    this.quizId = this.route.snapshot.paramMap.get('id');
    console.log("Quiz ID: " + this.quizId);

    // Jei naudojame toki buda, tuomet, ngFor dalyje turime naudoti | async pipe
    // https://angular.io/guide/observables-in-angular#async-pipe
    // this.answersFromDatabase = db.list('answers').valueChanges();

    db.object('quizes/' + this.quizId).valueChanges().subscribe((data: any) => {
      console.warn("Quiz data:");
      this.quiz = data;
      this.quizQuestions = data.questions;
      console.warn(data);
    });
  }

  ngOnInit(): void {
  }

  nextQuestion() {

    // Issaugoti vartotojo pasirinkima cia
    let userAnswer = {
      "questionKey": this.selectedQuestionKey,
      "answerKey": this.selectedAnswerKey,
      "correct": this.selectedAnswerObj.value.correct
    }

    this.currentQuestion++;
    this.userAnswers.push(userAnswer);
    this.countProgress();

    console.log("Selected answer obj:")
    console.log(this.selectedAnswerObj);

    let foundAnswer = false;
    let foundId = 0;
    /* Patikriname ar masyve toks atsakymas dar neirasytas */
    /*  for(let i = 0; i < this.userAnswers.length; i++) {
       if(this.userAnswers[i].questionKey == userAnswer.questionKey) {
         // Radau egzistuojanti atsakymo irasa
         foundAnswer = true;
         foundId = i;
       }
     }
     if(foundAnswer) {
       this.userAnswers[foundId] = userAnswer;
     } else {
     } */


    console.log("Vartotojo atsakymai: userAnswers kintamasis");
    console.log(this.userAnswers);
  }

  previousQuestion() {
    this.currentQuestion--;
    this.userAnswers.pop();
    this.countProgress();
    // Pasalinu paskutini masyvo elementa
    console.log(this.userAnswers);
  }

  countProgress() {
    let questionsCount = Object.keys(this.quizQuestions).length;
    this.progress = (this.currentQuestion) / questionsCount * 100;
    console.log("Progress: " + this.progress);

    if (this.progress === 100) {
      // Jei progresas yra 100% rodome results puslapi
      this.showResults = true;
      // Rezultato skaiciavimas
      this.userScore = this.countResult();
    }
  }

  /* Funckija kuri pereina per visus atsakymus ir susumuoja teisingai pasirinktus atsakymus */
  countResult() {
    console.log(this.userAnswers);
    let score = 0;
    this.questionCount = 0;
    for (let i = 0; i < this.userAnswers.length; i++) {
      if (this.userAnswers[i].correct) {
        score++;
      }
      this.questionCount++;
    }

    return score;
  }

  userSelectedAnswer(question: any, answer: any) {
    // console.log("Question", question);
    // console.log("Answer", answer);
    /* Palyginame dabartini pasirinkima su pries tai buvusiu pasirinkimu  */
    if (this.selectedAnswerKey == answer.key) {
      // Jei pasirinkome ta pati klausima, selectedAnswerKey nustatome null
      // Tai ledzia mums igyvendinti toggle funkcionaluma
      this.selectedAnswerKey = null;
    } else {
      this.selectedAnswerKey = answer.key;
      answer.value.correct;
    }

    this.selectedQuestionKey = question.key;
    this.selectedAnswerObj = answer;
  }



}