import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from './movie.model'; // Import your Movie interface

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '685d8f19663659814f762cb6972b0daa'; // Replace with your actual API key
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString()); // Add page parameter

    return this.http.get<{ results: Movie[] }>(`${this.apiUrl}/movie/popular`, { params })
      .pipe(
        map(response => response.results), // Extract the movie array
        catchError(this.handleError) // Handle errors
      );
  }

  searchMovies(query: string, page: number = 1): Observable<Movie[]> {
        const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('query', query)
          .set('page', page.toString());

        return this.http.get<{ results: Movie[] }>(`${this.apiUrl}/search/movie`, { params })
          .pipe(
            map(response => response.results),
            catchError(this.handleError)
          );
      }



  private handleError(error: any) {
    console.error('API Error:', error); // Log the error
    return throwError(() => new Error('Something went wrong. Please try again later.')); // User-friendly message
  }
}
