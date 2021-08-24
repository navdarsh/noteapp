import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginDetail = {
    name: '',
    passWord: '',
  };
  allUsers: any = [];
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
  }

  gotoSignup() {
    this.route.navigateByUrl('signup');
  }

  checkCredentials() {
    let exist = false;
    this.allUsers.forEach((user: any) => {
      if (
        user.name.toLowerCase() === this.loginDetail.name.toLocaleLowerCase() &&
        user.passWord.toLowerCase() ===
          this.loginDetail.passWord.toLocaleLowerCase()
      ){
        exist = true;
      }
    });
    if(exist){
      this.route.navigate(['notes', this.loginDetail.name]);
    }else{
      if(this.loginDetail.name==''){
        return alert('Enter Email');
      }else if(this.loginDetail.passWord==''){
        return alert('Password');
      }else{
      return alert('Invalid Email or Password');
    }
    }
    this.resetForm();
  }

  resetForm() {
    this.loginDetail = {
      name: '',
      passWord: '',
    };
  }
}
