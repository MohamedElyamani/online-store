import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[ReactiveFormsModule,CommonModule,RouterLink]

})

export class RegisterComponent implements OnInit {
  @ViewChild('aggrement') aggrement !: ElementRef;
  isAgree:boolean = false;
  isLoading : boolean = false;
  errMsg !: string;
  sucssMsg !: string;

    // use this because if inject it within constructor => fb will error (it used before initialize)
    private fb = inject(FormBuilder);
  constructor(private _AuthService : AuthService, private toaster: ToastrService, private router:Router) {}
  ngOnInit() {}

   registerForm : FormGroup = this.fb.group({
    name : [null, [Validators.required, Validators.minLength(3)]],
    email:[null,[Validators.required, Validators.email, Validators.pattern(/^.+@gmail\.com$|^.+@yahoo\.com$/)]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
    rePassword : [null],
    phone : [null,[Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]]
    }, {Validators : this.confirmPassword})

    register(){
      if(this.registerForm.valid){
        this._AuthService.displayRegisterData(this.registerForm.value).subscribe({
          next: (res) => {
            this.isLoading = true;
            this.toaster.success('Account Created', 'Success' , {
              timeOut: 2000,
              positionClass: 'toast-top-right',
            })
            this.registerForm.reset();
            this.isLoading = false;
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.errMsg = err.error.message;
            this.toaster.error(`${this.errMsg}`, 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            })
          }
        });
      } else{
        this.registerForm.markAllAsTouched();
        this.toaster.warning('Cheack Data Entred', 'Warning', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        })
      };
    }

    confirmPassword(g : AbstractControl){
      return g.get('rePassword')?.value === g.get('passowrd')?.value ? null : {mismatch : true}
    }

    check(){
      this.isAgree = this.aggrement.nativeElement.checked;
    }
}