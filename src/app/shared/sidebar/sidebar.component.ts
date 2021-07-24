import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent{

  // Traer aquí la información del servicio , y igualarla al array búsquedas
  constructor(private gifsservice:GifsService){ }
  
  get historial(){
    return this.gifsservice.historial;
  }
  buscar(item:string){
    this.gifsservice.buscarGifs(item)
  }
 
}
