import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MovieFormComponent,ReactiveFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tmdb';
}
