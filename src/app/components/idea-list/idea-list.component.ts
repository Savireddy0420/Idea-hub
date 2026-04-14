import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { AddIdeaComponent } from '../add-idea/add-idea.component';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-idea-list',
  standalone: true,
  imports: [CommonModule, IdeaCardComponent, AddIdeaComponent],
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {

  ideas: Idea[] = [];
  user: any;
  selectedTab: string = 'all';

  constructor(
    private ideaService: IdeaService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.load();
  }

  load() {
    this.ideas = this.ideaService.getIdeas();
  }

  get filteredIdeas() {
    if (this.selectedTab === 'my') {
      return this.ideas.filter(i => i.author === this.user.name);
    }
    return this.ideas;
  }

  onLike(id: string) {
    this.ideaService.likeIdea(id);
    this.load();
  }

  onComment(e: { id: string; text: string }) {
    this.ideaService.addComment(e.id, e.text);
    this.load();
  }

  onDelete(id: string) {
    this.ideaService.deleteIdea(id);
    this.load();
  }
}