import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-idea',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.css']
})
export class AddIdeaComponent {

  @Output() ideaAdded = new EventEmitter<void>();

  title = '';
  description = '';
  category = 'General';

  categories = ['General', 'Tech', 'Design', 'Marketing', 'Operations'];

  constructor(
    private ideaService: IdeaService,
    private auth: AuthService
  ) {}

  submit() {
    const user = this.auth.getUser();

    if (!this.title.trim()) return;

    this.ideaService.addIdea({
      title: this.title,
      description: this.description,
      category: this.category,
      author: user.name
    });

    this.title = '';
    this.description = '';
    this.ideaAdded.emit();
  }
}