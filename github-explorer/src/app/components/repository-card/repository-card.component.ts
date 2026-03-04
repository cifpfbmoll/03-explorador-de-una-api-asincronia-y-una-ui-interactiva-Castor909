import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-repository-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.css']
})
export class RepositoryCardComponent {
  @Input() repository!: Repository;
  showDetails = signal<boolean>(false);

  toggleDetails(): void {
    this.showDetails.update(value => !value);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  openRepository(): void {
    window.open(this.repository.html_url, '_blank');
  }

  openOwnerProfile(): void {
    window.open(this.repository.owner.html_url, '_blank');
  }
}
