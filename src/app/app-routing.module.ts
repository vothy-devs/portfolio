import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
 {path: 'home', component: HomeComponent, title: "Home - Vothy Devs"},
 {path: 'projects', component: MyProjectsComponent, title: "Current Projects - Vothy Devs"},
 {path: 'about', component: AboutMeComponent, title: "About - Vothy Devs"},
 { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
