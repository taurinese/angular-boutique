import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, skip, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Credentials} from '../views/login/login.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentResponse: BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)

  get currentUser(): User | undefined {
    return this.currentResponse.value?.user
  }

  get currentName() {
    return this.currentUser?.username
  }

  get token() {
    return this.currentResponse.value?.token
  }

  get isLogged(): boolean {
    return !!this.currentResponse.value
  }
  private http: HttpClient = inject(HttpClient)
  private router = inject(Router)
  private readonly AUTH_KEY = "AUTH_RESPONSE"

  constructor() {
    const auth = sessionStorage.getItem(this.AUTH_KEY)
    if(auth) {
      this.currentResponse.next(JSON.parse(auth))
    }

    this.currentResponse.pipe(skip(1)).subscribe(response => {
      if(response){
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response))
      }
      else {
        this.router.navigate(['/home'])
        sessionStorage.clear()
      }
    })
  }

  login(credential: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/login", credential)
      // Ajouter des opérations lors de la préparation de l'observable
      .pipe(
        // Permet de lire la valeur qui sera retournée lors de la souscription
        tap(response => this.currentResponse.next(response))
      )
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/register",user)
  }

  logout(): void {
    this.currentResponse.next(undefined)
  }
}

export interface AuthResponse {
  token: string,
  user: User
}

export interface User {
  id: number,
  email: string,
  password: string,
  username: string
}
