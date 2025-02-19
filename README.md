
# Step by step guide to create an Angular application
## Create a new Angular project
```bash
ng new movies-app --skip-tests
cd movies-app
ng serve --open
```

## Create a component `MoviesList`
```bash
ng generate component movies-list
```

### Add a list of movies in `MoviesListComponent`
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies = [
    {
      title: 'The Shawshank Redemption',
      description : "Two imprisoned",
      date : new Date(1994, 9, 14),
    }
    ];
}
```
### Add the list of movies in the template `movies-list.component.html`
```html
<h2>Movies List</h2>
<ul>
  <li *ngFor="let movie of movies">
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.description }}</p>
    <p>{{ movie.date | date }}</p>
  </li>
</ul>
```
the `date` pipe is used to format the date and it's a built-in pipe in Angular.

Check out the [Angular pipes](https://angular.dev/guide/templates/pipes#built-in-pipes) for more information.

the `*ngFor` directive is used to iterate over the list of movies.

## Create a service `MoviesService`
```bash
ng generate service movies
```

### Add the list of movies in `MoviesService`
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies = [
    {
      title: 'The Shawshank Redemption',
      description : "Two imprisoned",
      date : new Date(1994, 9, 14),
    }
    ];
  constructor() { }
}
```

### Inject the service in `MoviesListComponent`
```typescript
import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})

export class MoviesListComponent implements OnInit {
  movies = [];
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.movies = this.moviesService.movies;
  }
}
```

## Use HttpClient to fetch movies from a REST API
### add the provider in the app.config.ts

```typescript
import { ApplicationConfig, provideZoneChangeDetection,  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ]
};
```

this way we can use the HttpClient everywhere in the application wethever its within a service or a component.

### add the HttpClient in the MoviesService
```typescript
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
```

Basically, we have two methods in the service, one to get the popular movies and the other to search for movies.

We are using the `HttpClient` to make the HTTP requests and the `HttpParams` to pass the query parameters following their documentation.

We are using the `pipe` operator to transform the response and catch any errors.

We are using the `map` operator to extract the movie array from the response.

We are using the `catchError` operator to handle any errors and log them to the console.

We are using the `throwError` function to return a user-friendly message in case of an error.

The observable is a stream of data that can be observed over time and its apart of the RxJS library if we want and component neeeds to subscribe to the observable to get the data.

### Add the Movie interface in the `movie.model.ts`
```typescript
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}
```

### Inject the service in `MoviesListComponent`
```typescript
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe(movies => this.movies = movies);
  }
}
```

### Add the list of movies in the template `movies-list.component.html`
```html
<h2>Movies List</h2>
<ul>
  <li *ngFor="let movie of movies">
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.overview }}</p>
    <p>{{ movie.release_date }}</p>
    <img [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="{{ movie.title }}">
  </li>
</ul>
```

Angular have DI (Dependency Injection) system that allows us to inject the service in the component constructor.

We are using the `subscribe` method to get the data from the observable and assign it to the `movies` property.

We are using the `*ngFor` directive to iterate over the list of movies.

We are using the `[]` to bind the `src` attribute to the `poster_path` property.


## Forms
#### types of forms
- Template-driven forms
- Reactive forms

##### Template-driven forms
###### Create a new component `MovieForm`
```bash
ng generate component movie-form
```

##### Add the form in the `MovieFormComponent`
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})

export class MovieFormComponent {
  movie = {
    title: '',
    overview: '',
    release_date: '',
    poster_path: ''
  };

  onSubmit() {
    console.log(this.movie);
  }
}
```

#### add Validation to a template-driven form

##### Add the required attribute to the input fields in the template `movie-form.component.html`
```html
<h2>Add a Movie</h2>

<form (ngSubmit)="onSubmit()">
  <div>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" [(ngModel)]="movie.title" required>
  </div>
  <div>
    <label for="overview">Overview</label>
    <textarea id="overview" name="overview" [(ngModel)]="movie.overview" required></textarea>
  </div>
  <div>
    <label for="release_date">Release Date</label>
    <input type="date" id="release_date" name="release_date" [(ngModel)]="movie.release_date" required>
  </div>
  <div>
    <label for="poster_path">Poster Path</label>
    <input type="text" id="poster_path" name="poster_path" [(ngModel)]="movie.poster_path" required>
  </div>
  <button type="submit">Submit</button>
</form>
```


##### Add the form in the template `movie-form.component.html`
```html
<h2>Add a Movie</h2>
<form (ngSubmit)="onSubmit()">
  <div>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" [(ngModel)]="movie.title">
  </div>
  <div>
    <label for="overview">Overview</label>
    <textarea id="overview" name="overview" [(ngModel)]="movie.overview"></textarea>
  </div>
  <div>
    <label for="release_date">Release Date</label>
    <input type="date" id="release_date" name="release_date" [(ngModel)]="movie.release_date">
  </div>
  <div>
    <label for="poster_path">Poster Path</label>
    <input type="text" id="poster_path" name="poster_path" [(ngModel)]="movie.poster_path">
  </div>
  <button type="submit">Submit</button>
</form>
```

#### Reactive forms
##### Create a new component `MovieFormReactive`
```bash
ng generate component movie-form-reactive
```

##### Add the form in the `MovieFormReactiveComponent`
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-form-reactive',
  templateUrl: './movie-form-reactive.component.html',
  styleUrls: ['./movie-form-reactive.component.css']
})
export class MovieFormReactiveComponent {
  movieForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      title: '',
      overview: '',
      release_date: '',
      poster_path: ''
    });
  }

  onSubmit() {
    console.log(this.movieForm.value);
  }
}
```

##### Add the form in the template `movie-form-reactive.component.html`
```html
<h2>Add a Movie</h2>
<form [formGroup]="movieForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="title">Title</label>
    <input type="text" id="title" formControlName="title">
  </div>
  <div>
    <label for="overview">Overview</label>
    <textarea id="overview" formControlName="overview"></textarea>
  </div>
  <div>
    <label for="release_date">Release Date</label>
    <input type="date" id="release_date" formControlName="release_date">
  </div>
  <div>
    <label for="poster_path">Poster Path</label>
    <input type="text" id="poster_path" formControlName="poster_path">
  </div>
  <button type="submit">Submit</button>
</form>
```
