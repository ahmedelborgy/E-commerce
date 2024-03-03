import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators,} 

from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
// import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _fb: FormBuilder,
    private _Router: Router,
    public dialog: MatDialog
  ) {}

  passwordShow: boolean = false;

  loginForm!: FormGroup;
  errMsg: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  public get f(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            localStorage.setItem('_token', response.token);
            this._AuthService.saveUser();
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }




  



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ForgotpasswordComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
   
  }


}

