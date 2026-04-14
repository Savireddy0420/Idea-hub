import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,        // ✅ IMPORTANT
  imports: [FormsModule],  // ✅ IMPORTANT
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name: string = '';
  role: string = 'employee';

  constructor(private auth: AuthService) {}

  login() {
    if (!this.name.trim()) {
      alert('Please enter your name');
      return;
    }

    this.auth.login({
      name: this.name,
      role: this.role
    });

    window.location.reload();
  }
}