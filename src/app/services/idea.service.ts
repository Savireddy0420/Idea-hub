// import { Injectable } from '@angular/core';
// import { Idea } from '../models/idea';

// @Injectable({ providedIn: 'root' })
// export class IdeaService {
//   private KEY = 'ideas';

//   getIdeas(): Idea[] {
//     const data = localStorage.getItem(this.KEY);
//     return data ? JSON.parse(data) : [];
//   }

//   addIdea(idea: Omit<Idea, 'id' | 'likes' | 'comments' | 'createdAt'>): void {
//     const ideas = this.getIdeas();
//     ideas.push({
//       ...idea,
//       id: Date.now().toString(),
//       likes: 0,
//       comments: [],
//       createdAt: new Date().toISOString()
//     });
//     localStorage.setItem(this.KEY, JSON.stringify(ideas));
//   }

//   likeIdea(id: string): void {
//     const ideas = this.getIdeas().map(i =>
//       i.id === id ? { ...i, likes: i.likes + 1 } : i
//     );
//     localStorage.setItem(this.KEY, JSON.stringify(ideas));
//   }

//   addComment(id: string, comment: string): void {
//     const ideas = this.getIdeas().map(i =>
//       i.id === id ? { ...i, comments: [...i.comments, comment] } : i
//     );
//     localStorage.setItem(this.KEY, JSON.stringify(ideas));
//   }
// }

import { Injectable } from '@angular/core';
import { Idea } from '../models/idea';

@Injectable({ providedIn: 'root' })
export class IdeaService {
  private KEY = 'ideas';

  getIdeas(): Idea[] {
    const data = localStorage.getItem(this.KEY);
    const ideas = data ? JSON.parse(data) : [];
    return ideas.sort((a: Idea, b: Idea) => b.likes - a.likes);
  }

 addIdea(idea: Omit<Idea, 'id' | 'likes' | 'comments' | 'createdAt'>): void {
  const ideas = this.getIdeas();
  ideas.push({
    ...idea,
    id: Date.now().toString(),
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(this.KEY, JSON.stringify(ideas));
}

  likeIdea(id: string): void {
    const ideas = this.getIdeas().map(i =>
      i.id === id ? { ...i, likes: i.likes + 1 } : i
    );
    localStorage.setItem(this.KEY, JSON.stringify(ideas));
  }

  addComment(id: string, comment: string): void {
    const ideas = this.getIdeas().map(i =>
      i.id === id ? { ...i, comments: [...i.comments, comment] } : i
    );
    localStorage.setItem(this.KEY, JSON.stringify(ideas));
  }

  deleteIdea(id: string): void {
    const ideas = this.getIdeas().filter(i => i.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(ideas));
  }
}