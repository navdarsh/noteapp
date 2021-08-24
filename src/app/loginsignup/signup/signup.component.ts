import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  allUsers = [{ name: '', email: '', passWord: '' }];
  signupForm = {
    name: '',
    email: '',
    passWord: '',
    notes: [],
  };
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
  }

  goBackLogin() {
    this.route.navigateByUrl('login');
  }

  saveUser() {
    if (this.signupForm.name == '') {
      alert('Please Enter Name');
    } else if (this.signupForm.email == '') {
      alert('Please Enter E-Mail');
    } else if (this.signupForm.passWord == null) {
      alert('Please Enter Password');
    } else {
      if (this.allUsers && this.allUsers.length > 0) {
        let exist = false;
        this.allUsers.forEach((user) => {
          if (user.name.toLowerCase() == this.signupForm.name.toLowerCase()) {
            exist = true;
          }
        });
        if (exist) {
          alert('User Already Exists');
        } else {
          this.allUsers.push(this.signupForm);
          localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
          this.route.navigate(['notes', this.signupForm.name]);
          this.reset();
        }
      } else {
        this.allUsers.push(this.signupForm);
        localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
        this.route.navigate(['notes', this.signupForm.name]);
        this.reset();
      }
    }
    console.log(this.allUsers);
  }

  reset() {
    this.signupForm = {
      name: '',
      email: '',
      passWord: '',
      notes: [],
    };
  }
}
