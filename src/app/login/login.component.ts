import { Component } from '@angular/core';
import { Input,  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InicioService } from '../Servicios/Inicio/InicioService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
  
})
export class LoginComponent {
 
  constructor(private router: Router,private inicioService: InicioService,private snackBar: MatSnackBar,public dialog: MatDialog) {
   

   }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });


  submit() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    const item: any = localStorage.getItem('bloggers');
    const isValid = this.inicioService.validarCredenciales(username, password,item);
   
    if (this.form.valid) {
    
      if (isValid) {
        this.snackBar.open('¡Bienvenido!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/inicio']);
        localStorage.setItem('correo', username);
      }else{
        this.snackBar.open('Datos inválidos, intente de nuevo', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/login']);
      }
      
    }
    
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
  }
  
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
  

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
    });
  
  }
 
  
}

