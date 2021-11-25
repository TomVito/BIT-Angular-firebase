import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public allQuizes : Array<any> = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.object('quizes').valueChanges()
    .subscribe((data : any) => {
      this.allQuizes = data;
      console.log(this.allQuizes);
    })
  }

}