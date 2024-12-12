import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected auth: AuthService = inject(AuthService)

  private router: Router = inject(Router)
  protected currentRoute: string =""

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url
    })
  }


}
