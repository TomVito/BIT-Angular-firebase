import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/question.model';
import { Quiz } from 'src/app/quiz.model';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  private quizId: string | null;

  public quiz: Quiz = new Quiz();

  public questions: Question = new Question();

  public questionsRef : AngularFireList<any>;
  public selectedQuestionAnswersRef : any;
  public seletedQuestion : any  = null;

  // Sis kintamasis naudojamas, kaip ngModel musu formoje
  public newQuestion : Question = new Question();

  // Pradinis objekto aprasymas jei neturim modelio kaip virsuje ^^
  public newAnswer : any = {
    title: '',
    correct: false
  }

  public showQuestionForm = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
  ) {
    this.quizId = this.route.snapshot.paramMap.get('id');
    console.log(this.quizId);

    db.object('quizes/' + this.quizId).valueChanges()
    .subscribe((data : any) => {
      this.quiz = data;
      console.log(this.quiz);
    });

    // Gauname quiz klausimus kaip masyva
    this.questionsRef = db.list('quizes/' + this.quizId + "/questions");
  }

  ngOnInit(): void {
  }

  addQuestion() {
    this.showQuestionForm = true;
  }

  createQuestion(form : NgForm) {
    console.log("Create Question");
    console.log(this.newQuestion);
    this.questionsRef.push(this.newQuestion).then(function() {
      alert("Klausimas sekmingai pridetas");
    });
  }

  deleteQuestion(key : string) {
    // to get a key, check the Example app below
    this.questionsRef.remove(key).then(function() {
      alert("Klausimas istrintas");
    });
  }

  selectQuestion(question : any) {
    this.seletedQuestion = question;
    console.log(this.seletedQuestion);
  }

  addAnswer(selectedQuestion : any) {
    // console.log(selectedQuestion.key);
    this.selectedQuestionAnswersRef = this.db.list('quizes/' + this.quizId + "/questions/" + selectedQuestion.key + "/answers/");
    this.selectedQuestionAnswersRef.push(this.newAnswer);
  }

  deleteAnswer(key : string) {
    // to get a key, check the Example app below
    this.selectedQuestionAnswersRef = this.db.list('quizes/' + this.quizId + "/questions/" + this.seletedQuestion.key + "/answers/");
    this.selectedQuestionAnswersRef.remove(key);
  }

}