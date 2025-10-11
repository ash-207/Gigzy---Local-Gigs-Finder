import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing_page';
import { AboutComponent } from './components/about/about';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ExploreComponent } from './components/explore/explore';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/login-auth/register.component';
import { PostGigComponent } from './components/post-gig/post_gig';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post-gig', component: PostGigComponent },
  { path: '**', redirectTo: '' } // fallback to landing page
];
