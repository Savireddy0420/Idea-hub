import { Component } from '@angular/core';
import { IdeaListComponent } from './components/idea-list/idea-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IdeaListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}