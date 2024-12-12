import { Component } from '@angular/core';
import {AbstractFormComponent} from '../../tools/abstract-form';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService, User} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractFormComponent{

  constructor(private auth: AuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.form.get('email')?.valueChanges.subscribe(email => {
      const username = email.split('@')[0];
      this.form.get('username')?.setValue(username, { emitEvent: false });
    });
  }

  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    email: new FormControl("", {validators: [Validators.required]}),
    password: new FormControl("", {validators: [Validators.required]}),
    username: new FormControl("")
  })

  onSubmit$(): void {
    //console.log(this.form.value)
    this.auth.register(this.form.value).subscribe(() => this.router.navigate(['/login']))
  }

}
