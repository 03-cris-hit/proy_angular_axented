import { Component, Inject  } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InicioService } from '../Servicios/Inicio/InicioService';
import { Blogger } from '../Interfaces/Bloger/Blogger.interface';
@Component({
  selector: 'app-modal-bloger',
  templateUrl: './modal-bloger.component.html',
  styleUrls: ['./modal-bloger.component.css']
})
export class ModalBlogerComponent {
  nombre: any | null;
  email: any | null;
  website: any | null;
  amigos: any | null;
  img: any | null;
  bloggers:any | [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private inicioService: InicioService) {
    this.bloggers =[];
    const bloggerEncontrado = this.inicioService.buscarBloggerPorId(data.bloggerId);
    if (bloggerEncontrado) {
      this.nombre = bloggerEncontrado.name;
      this.email = bloggerEncontrado.email;
      this.website = bloggerEncontrado.website;
      this.amigos = bloggerEncontrado.friends.length;
      this.img = localStorage.getItem(bloggerEncontrado.id);
      if (this.img == null) {
        this.img = bloggerEncontrado.picture_url;
      }
      const bloggers: Blogger[] = JSON.parse(localStorage.getItem('listblogger') || '[]');
      bloggerEncontrado?.friends.forEach(item => {
        var ad : any = bloggers.find((blogger) => blogger.id === item);
        this.bloggers.push(ad.name);
      });
    }

   }

}
