import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userForm: any;
     
  constructor(private formbulider: FormBuilder,
    private accountService: AccountService,
       private toastr: ToastrService) {
        this.userForm = this.formbulider.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
          email: ['', [Validators.required]],
        });
  
        }


        CreateUser(user: User) {
          const newUser = this.userForm.value;
          this.accountService.createUser(newUser).subscribe(
            () => {
              this.userForm.reset();
              this.toastr.success('Data Saved Successfully');
            }
          );
        }

}
