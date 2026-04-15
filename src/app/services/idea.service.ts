// import { Injectable } from '@angular/core';
// import { Idea } from '../models/idea.model';

// @Injectable({ providedIn: 'root' })
// export class IdeaService {

//   private ideas: Idea[] = [];

//   getIdeas(): Idea[] {
//     return this.ideas;
//   }

//   addIdea(idea: Omit<Idea, 'id' | 'likes' | 'comments'>) {
//     const newIdea: Idea = {
//       id: Date.now().toString(),
//       likes: 0,
//       comments: [],
//       createdAt: Date.now(),
//       ...idea
//     };

//     this.ideas.unshift(newIdea);
//   }

//   likeIdea(id: string) {
//     const idea = this.ideas.find(i => i.id === id);
//     if (idea) idea.likes++;
//   }

//   addComment(id: string, text: string) {
//     const idea = this.ideas.find(i => i.id === id);
//     if (idea) idea.comments.push(text);
//   }

//   deleteIdea(id: string) {
//     this.ideas = this.ideas.filter(i => i.id !== id);
//   }

//   // ✅ STATUS UPDATE
//   updateStatus(id: string, status: string) {
//     const idea = this.ideas.find(i => i.id === id);
    
//   }
// }


import { Injectable } from '@angular/core';
import { Idea } from '../models/idea.model';

@Injectable({ providedIn: 'root' })
export class IdeaService {

  private storageKey = 'ideas';

  // ✅ GET ideas from localStorage
  getIdeas(): Idea[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // ✅ SAVE helper
  private saveIdeas(ideas: Idea[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(ideas));
  }

  // ✅ ADD IDEA
  addIdea(idea: Omit<Idea, 'id' | 'likes' | 'comments'>) {
    const ideas = this.getIdeas();

    const newIdea: Idea = {
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      createdAt: Date.now(),
      ...idea
    };

    ideas.unshift(newIdea);
    this.saveIdeas(ideas);
  }

  // ❤️ LIKE
  likeIdea(id: string) {
    const ideas = this.getIdeas();
    const idea = ideas.find(i => i.id === id);

    if (idea) idea.likes++;

    this.saveIdeas(ideas);
  }

  // 💬 COMMENT
  addComment(id: string, text: string) {
    const ideas = this.getIdeas();
    const idea = ideas.find(i => i.id === id);

    if (idea) idea.comments.push(text);

    this.saveIdeas(ideas);
  }

  // 🗑 DELETE
  deleteIdea(id: string) {
    const ideas = this.getIdeas().filter(i => i.id !== id);
    this.saveIdeas(ideas);
  }
}