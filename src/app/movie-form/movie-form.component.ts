import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent {
  movie = {
    title: '',
    overview: '',
    release_date: '',
    poster_path: ''
  };

  model = { username: '', email: '' };


  onSubmit() {
    console.log(this.movie);
  }
}
