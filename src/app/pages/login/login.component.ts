import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  
  constructor(public fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required])]
    })
  }

  submit(){
    if(this.form.valid){
      this.loginService.storeUser(this.form.value).subscribe(res=>{
        if(res.name){
          this.router.navigate(['/invoice/list'],{replaceUrl: true});
        }
      });
    }
  }

}
