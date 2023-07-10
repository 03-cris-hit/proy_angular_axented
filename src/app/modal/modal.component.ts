import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InicioService } from '../Servicios/Inicio/InicioService';
import { Blogger } from '../Interfaces/Bloger/Blogger.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private inicioService: InicioService, private snackBar: MatSnackBar) { }
  formData: any = {};
  fileName = '';
  selectedImage: any | null;
  selectedImageBase: any | null;

  submitForm() {
    try {
      const newEntry: Blogger = {
        id: '',
        name: this.formData.name,
        website: this.formData.website,
        picture_url: 'https://placekitten.com/200/300',
        email: this.formData.email,
        password: '123',
        friends: []
      };
      const item: any = localStorage.getItem('bloggers');
      var itemuser = this.inicioService.validarEmail(this.formData.email, item);
      if (itemuser) {
        this.snackBar.open('La cuenta ya ha sido dada de alta.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      } else {

        var id = this.inicioService.crearNuevoBlogger(newEntry);
        if (this.selectedImageBase) {
          const imageKey = id;
          debugger

          localStorage.setItem(imageKey, this.selectedImageBase);


        }
        this.dialogRef.close();
        this.snackBar.open('¡La cuenta ha sido creada con éxito!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }



    } catch (e) {
      this.snackBar.open('El servicio tiene problemas.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      console.log(e);
    }

  }

  closeModal() {
    this.dialogRef.close();
  }


  seleccionarArchivo(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedFormats = ['image/jpeg', 'image/png'];
      const fileType = file.type;

      if (allowedFormats.includes(fileType)) {
        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.selectedImageBase = base64String;
        };
        reader.readAsDataURL(this.selectedImage);

        this.fileName = this.selectedImage.name;
      } else {
        this.snackBar.open('Solo se permiten archivos son las siguente extenciones .jpg y .png', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }
    }
  }
}
