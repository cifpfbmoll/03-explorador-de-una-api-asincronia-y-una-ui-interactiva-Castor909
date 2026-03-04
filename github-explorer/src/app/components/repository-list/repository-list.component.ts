import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { RepositoryCardComponent } from '../repository-card/repository-card.component';

@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [CommonModule, RepositoryCardComponent],
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent {
  constructor(public githubService: GithubService) {}

  closeError(): void {
    this.githubService.clearError();
  }
}
