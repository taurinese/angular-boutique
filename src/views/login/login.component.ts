import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from '../../tools/abstract-form';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private auth: AuthService = inject(AuthService)
  private router = inject(Router)

  credentials: Credentials = {
    email: "",
    password: ""
  };

  onSubmit(form: HTMLFormElement): void {
    if(form.checkValidity()) {
      this.auth.login(this.credentials).subscribe(() => {this.router.navigate(['/home'])})
      form.reset()
    }
  }

}

export interface Credentials {
  email: string,
  password: string
}
