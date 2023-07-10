import { Injectable } from '@angular/core';
import { Blogger } from 'src/app/Interfaces/Bloger/Blogger.interface';
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor() { }

  
  insertDataToLocalStorage(data: any) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('bloggers', jsonData);
  }
  validarCredenciales(email: string, password: string, item:any): boolean {
    const bloggers: Blogger[] = JSON.parse(item);
    const usuario = bloggers.find(blogger => blogger.email === email && blogger.password === password);
    return !!usuario; 
  }
  validarEmail(email: string,item:any): boolean {
    const bloggers: Blogger[] = JSON.parse(item);
    const usuario = bloggers.find(blogger => blogger.email === email );
    return !!usuario; 
  }
  crearNuevoBlogger(blogger: Blogger) {
    const bloggers: Blogger[] = JSON.parse(localStorage.getItem('bloggers') || '[]');
    const id = this.obtenerId(bloggers);
    blogger.id = id.toString();
    bloggers.push(blogger);
    localStorage.setItem('bloggers', JSON.stringify(bloggers));
    return id.toString();
  }
  buscarBloggerPorCorreo(email: string): Blogger | undefined {
    const bloggers: Blogger[] = JSON.parse(localStorage.getItem('bloggers') || '[]');
    return bloggers.find((blogger) => blogger.email === email);
  }
  buscarBloggerPorId(id: string): Blogger | undefined {
    const bloggers: Blogger[] = JSON.parse(localStorage.getItem('listblogger') || '[]');
    return bloggers.find((blogger) => blogger.id === id);
  }

  obtenerId(bloggers: Blogger[]): number {
    let maxId = 0;
    for (const blogger of bloggers) {
      const id = parseInt(blogger.id, 10);
      if (id > maxId) {
        maxId = id;
      }
    }
    return maxId + 1;
  }
}