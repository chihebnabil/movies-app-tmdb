import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  movies: Movie[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  currentPage = 1;
  searchTerm: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.loading = true;
    this.movieService.getPopularMovies(this.currentPage).subscribe({
      next: (movies) => {
        this.movies = this.movies.concat(movies);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  searchMovies() {
    this.currentPage = 1;
    this.movies = [];
    this.loading = true;

    this.movieService.searchMovies(this.searchTerm, this.currentPage).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  loadMore() {
    this.currentPage++;
    if (this.searchTerm) {
      this.searchMovies();
    } else {
      this.loadMovies();
    }
  }
}