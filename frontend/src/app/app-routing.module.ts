import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {EmpresaComponent} from './components/empresa/empresa.component';
import {FpdualComponent} from './components/fpdual/fpdual.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { ResultadoAprendizajeComponent } from './components/resultado-aprendizaje/resultado-aprendizaje.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { LogComponent } from './components/log/log.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { ResetContrasenaComponent } from './components/reset-contrasena/reset-contrasena.component';
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "navigation", component: NavigationComponent},
  {path: "adminpage", component: AdminpageComponent},
  {path: "login", component: LoginComponent},
  {path: "formuser", component: FormUserComponent},
  {path: "editprofile", component: EditProfileComponent},
  {path: "fpdual", component: FpdualComponent},
  {path: "empresa", component: EmpresaComponent},
  {path: "usuario", component: UsuarioComponent},
  {path: "modulo", component: ModuloComponent},
  {path: "resultadoaprendizaje", component: ResultadoAprendizajeComponent},
  {path: "encuesta", component: EncuestaComponent},
  {path: "log", component: LogComponent},
  {path: "calificacion", component: CalificacionComponent},
  {path: "reset", component: ResetContrasenaComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  declarations: [],
  
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
