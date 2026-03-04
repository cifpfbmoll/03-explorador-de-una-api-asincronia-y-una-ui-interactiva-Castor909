import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent, RepositoryListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GitHub Explorer');
}
