import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback-component',
  templateUrl: './auth-callback-component.component.html',
  styleUrls: ['./auth-callback-component.component.css']
})
export class AuthCallbackComponentComponent {
  token: string | null = '';
  user: any = null;

  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    // Retrieve query parameters from URL (e.g., token, user details)
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.user = JSON.parse(params['user']);  // Parse the user object if it's passed
      console.log('Token:', this.token);
      console.log('User:', this.user);
      
      // You can store the token in localStorage and take further actions
      if (this.token) {
        localStorage.setItem('token', this.token);
        this.router.navigate(['/home'])
      }
    });
  }
}
