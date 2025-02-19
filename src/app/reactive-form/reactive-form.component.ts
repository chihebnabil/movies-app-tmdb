import { Component } from '@angular/core';
import { ReactiveFormsModule , FormGroup, FormControl,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
  }
}
