import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdeaService } from '../../services/idea.service';

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
  author = '';
  categories = ['General', 'Tech', 'Design', 'Marketing', 'Operations'];

  constructor(private ideaService: IdeaService) {}

  submit() {
  if (!this.title.trim() || !this.author.trim()) return;
  this.ideaService.addIdea({
    title: this.title,
    description: this.description,
    category: this.category,
    author: this.author
  });
  this.title = this.description = this.author = '';
  this.ideaAdded.emit();
}
}