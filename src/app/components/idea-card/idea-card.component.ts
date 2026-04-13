import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Idea } from '../../models/idea';

@Component({
  selector: 'app-idea-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaCardComponent {
  @Input() idea!: Idea;
  @Input() isTop = false;
  @Output() liked = new EventEmitter<string>();
  @Output() commented = new EventEmitter<{ id: string; text: string }>();
  @Output() deleted = new EventEmitter<string>();

  newComment = '';
  showComments = false;
  hasLiked = false;

  like() {
    if (this.hasLiked) return;
    this.hasLiked = true;
    this.liked.emit(this.idea.id);
  }

  delete() { this.deleted.emit(this.idea.id); }

  addComment() {
    if (!this.newComment.trim()) return;
    this.commented.emit({ id: this.idea.id, text: this.newComment });
    this.newComment = '';
  }
}