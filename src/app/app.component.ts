import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'BIT-Angular-firebase';

  // public answersFromDatabase : Observable<any[]>;
  public answers : Array<any> = [];
  public quiz : any = {};
  public quizQuestions : Array<any> = [];
  public today : any = new Date();
  public currentQuestion : number = 0;
  public progress : number = 0;

  constructor (db: AngularFireDatabase) {
    // this.answersFromDatabase = db.list('answers').valueChanges();
    db.object('quizes/abc').valueChanges().subscribe((data : any ) => {
      this.quiz = data;
      this.quizQuestions = data.questions;
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    let questionsCount = Object.keys(this.quizQuestions).length;

    this.progress = (this.currentQuestion) / questionsCount  * 100;
    console.log("Progress: " + this.progress);
  }

}