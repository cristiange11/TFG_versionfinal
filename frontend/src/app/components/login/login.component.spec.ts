import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from '../../app-routing.module'
import { RoleGuardService } from '../../guards/role-guard-service.service';
import { AuthorizationService } from 'src/app/guards/authorization.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, RouterTestingModule, NgbModule, AppRoutingModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule ],
      providers: [RoleGuardService, AuthService, AuthorizationService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login admin', () => {
    let loginElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthService);
    component.loginForm.controls['dni'].setValue('12345678A');
    component.loginForm.controls['password'].setValue('Olacmtas12');
    let loginSpy = spyOn(authService, 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    loginElement.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalledTimes(1);
  });
  it('Form should be invalid', async(() => {
    component.loginForm.controls['dni'].setValue('234A');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Form should be valid', async(() => {
    component.loginForm.controls['dni'].setValue('12345678A');
    component.loginForm.controls['password'].setValue('Olacmtas12');
    expect(component.loginForm.valid).toBeTruthy();
  }));
});
