import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  isLoading:boolean = false;
  errMsg!: string;
  constructor(private _AuthService : AuthService, private toaster: ToastrService, private router:Router) {}

  ngOnInit() {}
  loginForm: FormGroup = this.fb.group({
  email: [null, [Validators.required]],
  password: [null, [Validators.required]]
});

  login(){
    if(this.loginForm.valid){
      this._AuthService.displayLoginData(this.loginForm.value).subscribe({
        next:(res)=>{
          this.isLoading = true;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home'])
        },
        error :(err) => {
          this.errMsg = err.error.message;
          this.toaster.error(`${this.errMsg}`, 'Error',{
            timeOut: 3000,
            positionClass: 'toast-top-right',
          })
        }
      })
    }
  }
}
