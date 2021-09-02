import { RecoveryComponent } from './components/recovery/recovery.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { FpdualComponent } from './components/fpdual/fpdual.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { ResultadoAprendizajeComponent } from './components/resultado-aprendizaje/resultado-aprendizaje.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { LogComponent } from './components/log/log.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { ResetContrasenaComponent } from './components/reset-contrasena/reset-contrasena.component';
import { RoleGuardService as RoleGuard } from './guards/role-guard-service.service';
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "navigation", component: NavigationComponent },
  { path: "adminpage", component: AdminpageComponent, canActivate: [RoleGuard], data: { expectedRole: [1] } },
  { path: "login", component: LoginComponent },
  { path: "formuser", component: FormUserComponent, canActivate: [RoleGuard], data: { expectedRole: [1, 2] } },
  { path: "editprofile", component: EditProfileComponent, canActivate: [RoleGuard] },
  { path: "fpdual", component: FpdualComponent, canActivate: [RoleGuard], data: { expectedRole: [1, 2] } },
  { path: "empresa", component: EmpresaComponent, canActivate: [RoleGuard], data: { expectedRole: [1, 2] } },
  { path: "usuario", component: UsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: [1, 2] } },
  { path: "modulo", component: ModuloComponent, canActivate: [RoleGuard] },
  { path: "resultadoaprendizaje", component: ResultadoAprendizajeComponent, canActivate: [RoleGuard] },
  { path: "encuesta", component: EncuestaComponent, canActivate: [RoleGuard] },
  { path: "log", component: LogComponent, canActivate: [RoleGuard], data: { expectedRole: [1] } },
  { path: "calificacion", component: CalificacionComponent, canActivate: [RoleGuard] },
  { path: "reset", component: ResetContrasenaComponent },
  { path: "recovery", component: RecoveryComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  declarations: [],


  exports: [RouterModule]
})
export class AppRoutingModule { }
