import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-idea-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idea-card.component.html'
})
export class IdeaCardComponent {

  @Input() idea!: Idea;
  @Input() currentUser: any;

  @Output() liked = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();
  @Output() commented = new EventEmitter<{ id: string; text: string }>();

  newComment = '';
  showComments = false;
  hasLiked = false;

  // ❤️ Like
  like() {
    if (this.hasLiked) return;
    this.hasLiked = true;
    this.liked.emit(this.idea.id);
  }
  //category color
  getCategoryColor(category: string) {
  return {
    'bg-[#355C7D] text-white': category === 'Tech',
    'bg-[#F48B94] text-white': category === 'Design',
    'bg-[#507E65] text-white': category === 'Marketing',
    'bg-[#6C5B7B] text-white': category === 'Operations',
    'bg-[#E2BB78] text-gray-900': category === 'General'
  };
}

  // 🗑 Delete
  delete() {
    this.deleted.emit(this.idea.id);
  }

  // 💬 Comment
  addComment() {
    if (!this.newComment.trim()) return;

    this.commented.emit({
      id: this.idea.id,
      text: this.newComment
    });

    this.newComment = '';
  }

  // ✅ DELETE PERMISSION (FIXED)
  canDelete(): boolean {
    if (!this.currentUser) return false;

    // Admin → delete all
    if (this.currentUser.role === 'admin') {
      return true;
    }

    // Employee → only own ideas (safe compare)
    return this.idea.author?.toLowerCase().trim() ===
           this.currentUser?.name?.toLowerCase().trim();
  }

  // 🎨 Avatar color
  getAvatarColor(name: string): string {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500'
    ];

    if (!name) return 'bg-gray-400';

    return colors[name.charCodeAt(0) % colors.length];
  }
}