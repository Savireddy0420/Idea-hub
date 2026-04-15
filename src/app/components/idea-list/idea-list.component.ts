import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { AddIdeaComponent } from '../add-idea/add-idea.component';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-idea-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IdeaCardComponent, AddIdeaComponent],
  templateUrl: './idea-list.component.html'
})
export class IdeaListComponent implements OnInit {

  ideas: any[] = [];
  user: any;

  selectedTab: string = 'all';
  searchText: string = '';
  selectedCategory: string = 'All';

  categories = ['All', 'Tech', 'Design', 'Marketing', 'Operations', 'General'];

  constructor(
    private ideaService: IdeaService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.load();
  }

  // ✅ LOAD + NEW TAG LOGIC
  load() {
    const data = this.ideaService.getIdeas().filter(i => i.title);

    // Latest first
    data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    this.ideas = data.map((idea, index) => ({
      ...idea,
      isNew: index === 0
    }));
  }

  // ✅ FILTER LOGIC (CLEAN & FIXED)
  get filteredIdeas() {
    let data = [...this.ideas];

    // My Ideas
    if (this.selectedTab === 'my' && this.user?.name) {
      data = data.filter(i =>
        i.author?.toLowerCase().trim().includes(
          this.user?.name?.toLowerCase().trim()
        )
      );
    }

    // Search
    if (this.searchText && this.searchText.trim() !== '') {
      data = data.filter(i =>
        i.title?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Category
    if (this.selectedCategory !== 'All') {
      data = data.filter(i => i.category === this.selectedCategory);
    }

    return data;
  }

  // ❤️ Like
  onLike(id: string) {
    this.ideaService.likeIdea(id);
    this.load();
  }

  // 💬 Comment
  onComment(e: { id: string; text: string }) {
    this.ideaService.addComment(e.id, e.text);
    this.load();
  }

  // 🗑 Delete
  onDelete(id: string) {
    this.ideaService.deleteIdea(id);
    this.load();
  }
}