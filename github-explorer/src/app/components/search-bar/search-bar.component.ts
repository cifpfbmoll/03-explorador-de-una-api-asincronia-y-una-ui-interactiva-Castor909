import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery = signal<string>('');
  showFilters = signal<boolean>(false);

  // Available languages for filter
  languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 
    'Ruby', 'Go', 'Rust', 'PHP', 'Swift', 'Kotlin'
  ];

  constructor(public githubService: GithubService) {}

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (query) {
      this.githubService.searchRepositories(query).subscribe();
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  toggleFilters(): void {
    this.showFilters.update(value => !value);
  }

  onLanguageChange(language: string): void {
    this.githubService.setLanguageFilter(language || null);
  }

  onMinStarsChange(stars: string): void {
    this.githubService.setMinStarsFilter(Number(stars) || 0);
  }

  clearFilters(): void {
    this.githubService.clearFilters();
  }

  applyFilters(): void {
    if (this.searchQuery().trim()) {
      this.onSearch();
    }
  }
}
