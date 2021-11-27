import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreateComponent } from './components/quiz-create/quiz-create.component';
import { QuizEditComponent } from './components/quiz-edit/quiz-edit.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  { path: '', component: QuizListComponent },
  { path: 'quiz/create', component: QuizCreateComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'quiz/:id/edit', component: QuizEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
