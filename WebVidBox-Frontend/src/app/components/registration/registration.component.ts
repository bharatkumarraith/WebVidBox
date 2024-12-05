import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registartion } from 'src/app/models/registration';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form!: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private user: LoginService, private route: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Email regex pattern
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // Password regex pattern
        ]
      ],
      role: ['user', [Validators.required]]
    });

  }

  submit() {
    console.log('ml,lm');
    
    if (this.form.invalid) {
      this.submitted = true
      return;
    }
    const register: registartion = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value
    }


    this.user.register(register).subscribe({
      next: (res: any) => {
        console.log(res);

      },
      error: (err) => {

      }
    })
  }
}
