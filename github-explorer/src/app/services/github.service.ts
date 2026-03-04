import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { GitHubSearchResponse, Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly API_URL = 'https://api.github.com/search/repositories';
  
  // Signals for reactive state management
  public repositories = signal<Repository[]>([]);
  public isLoading = signal<boolean>(false);
  public error = signal<string | null>(null);
  public totalCount = signal<number>(0);
  public hasSearched = signal<boolean>(false);
  
  // Filter signals
  public selectedLanguage = signal<string | null>(null);
  public minStars = signal<number>(0);

  constructor(private http: HttpClient) {}

  searchRepositories(query: string, page: number = 1, perPage: number = 30): Observable<GitHubSearchResponse> {
    this.hasSearched.set(true);
    this.isLoading.set(true);
    this.error.set(null);
    this.repositories.set([]);
    this.totalCount.set(0);

    // Build query with filters
    let searchQuery = query;
    if (this.selectedLanguage()) {
      searchQuery += ` language:${this.selectedLanguage()}`;
    }
    if (this.minStars() > 0) {
      searchQuery += ` stars:>=${this.minStars()}`;
    }

    const params = {
      q: searchQuery,
      page: page.toString(),
      per_page: perPage.toString(),
      sort: 'stars',
      order: 'desc'
    };

    return this.http.get<GitHubSearchResponse>(this.API_URL, { params }).pipe(
      tap((response) => {
        this.repositories.set(response.items);
        this.totalCount.set(response.total_count);
        this.isLoading.set(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.repositories.set([]);
        this.totalCount.set(0);
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  getRepositoryDetails(owner: string, repo: string): Observable<Repository> {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    return this.http.get<Repository>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  setLanguageFilter(language: string | null): void {
    this.selectedLanguage.set(language);
  }

  setMinStarsFilter(stars: number): void {
    this.minStars.set(stars);
  }

  clearFilters(): void {
    this.selectedLanguage.set(null);
    this.minStars.set(0);
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'An error occurred';

    if (error.status === 403) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    } else if (error.status === 422) {
      errorMessage = 'Invalid search query. Please try a different search term.';
    } else if (error.status === 0) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.error.set(errorMessage);
    console.error('GitHub API Error:', error);
  }

  clearError(): void {
    this.error.set(null);
  }
}
