import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIT-Angular-firebase';

  answers : Array<any> = [
    "Answer 1",
    "Answer 2",
    "Answer 3",
    "Answer 4",
  ];

  constructor () {
    
  }

}
