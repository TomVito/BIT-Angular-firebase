import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public title = 'Quiz';

  // public answersFromDatabase : Observable<any[]>;
  public answers : Array<any> = [];
  public quizId : string | null;
  public quiz : any = {};
  public quizQuestions : Array<any> = [];
  public today : any = new Date();
  public currentQuestion : number = 0;
  public progress : number = 0;

  constructor (db: AngularFireDatabase, private router : Router, private route : ActivatedRoute) {
    this.quizId = this.route.snapshot.paramMap.get('id');
    // this.answersFromDatabase = db.list('answers').valueChanges();
    db.object('quizes/' + this.quizId).valueChanges().subscribe((data : any ) => {
      this.quiz = data;
      this.quizQuestions = data.questions;
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    this.countProgress();
  }

  previousQuestion() {
    this.currentQuestion--;
    this.countProgress();
  }

  countProgress() {
    let questionsCount = Object.keys(this.quizQuestions).length;
    this.progress = (this.currentQuestion) / questionsCount  * 100;
    console.log("Progress: " + this.progress);
  }

  ngOnInit(): void {
  }

}
