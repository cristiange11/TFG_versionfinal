import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "navigation", component: NavigationComponent},
  {path: "adminpage", component: AdminpageComponent},
  {path: "login", component: LoginComponent},
  {path: "formuser", component: FormUserComponent},
  {path: "editprofile", component: EditProfileComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  declarations: [],
  
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
