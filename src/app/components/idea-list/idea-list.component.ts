// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IdeaCardComponent } from '../idea-card/idea-card.component';
// import { AddIdeaComponent } from '../add-idea/add-idea.component';
// import { IdeaService } from '../../services/idea.service';
// import { Idea } from '../../models/idea';

// @Component({
//   selector: 'app-idea-list',
//   standalone: true,
//   imports: [CommonModule, IdeaCardComponent, AddIdeaComponent],
//     styleUrls: ['./idea-list.component.css'],
//  templateUrl: './idea-list.component.html'
// })
// export class IdeaListComponent implements OnInit {
//   ideas: Idea[] = [];

//   constructor(private ideaService: IdeaService) {}

//   ngOnInit() { this.load(); }

//   load() { this.ideas = this.ideaService.getIdeas(); }

//   onLike(id: string) {
//     this.ideaService.likeIdea(id);
//     this.load();
//   }

//   onComment(e: { id: string; text: string }) {
//     this.ideaService.addComment(e.id, e.text);
//     this.load();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { AddIdeaComponent } from '../add-idea/add-idea.component';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea';

@Component({
  selector: 'app-idea-list',
  standalone: true,
  imports: [CommonModule, IdeaCardComponent, AddIdeaComponent],
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {
  ideas: Idea[] = [];

  constructor(private ideaService: IdeaService) {}

  ngOnInit() { this.load(); }
  load() { this.ideas = this.ideaService.getIdeas(); }

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