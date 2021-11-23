import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIT-Angular-firebase';

  public answers : Array<any> = [
    "Answer 1",
    "Answer 2",
    "Answer 3",
    "Answer 4",
  ];

  public today : any = new Date();
  public currentQuestion : number = 0;
  public progress : number = 0;

  constructor () {
  
  }

  nextQuestion() {
   this.currentQuestion++;
   this.progress = this.currentQuestion / this.answers.length * 100;
  }

}