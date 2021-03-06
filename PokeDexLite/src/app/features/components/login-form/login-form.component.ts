import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import {
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private alert: AlertsService,
    private bottomSheetRef: MatBottomSheetRef<LoginFormComponent>,
    private route:Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit() {
    this.loginService.login(this.loginForm.value).subscribe((res) => {
      localStorage.setItem("userId", res.userId),
      localStorage.setItem("username", res.username),
      this.alert.loginSuccess();
      this.route.navigate(['home'])
      this.bottomSheetRef.dismiss();

    }, error =>{
      this.alert.loginFail()
    });
  }
}
