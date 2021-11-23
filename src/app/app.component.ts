import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIT-Angular-firebase';

  public answers : Array<any> = [];
  public today : any = new Date();
  public currentQuestion : number = 0;
  public progress : number = 0;

  constructor (db: AngularFireDatabase) {
    // this.answersFromDatabase = db.list('answers').valueChanges();
    db.list('answers').valueChanges().subscribe((data : any) => {
      this.answers = data;
    });
  }

  nextQuestion() {
   this.currentQuestion++;
   this.progress = this.currentQuestion / this.answers.length * 100;
  }

}