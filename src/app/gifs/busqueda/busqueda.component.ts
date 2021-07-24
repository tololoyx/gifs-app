import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  //Operador para asegurar que el objeto no es nulo(!), se usa cuando queremos decir a typescript que estamos seguros de que no se retornara un null
  
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; /*El viewChild busca un elemento con esa referencia local (txtBuscar) en el HTML y lo asigna al elemento que se indique en el HTML*/
  //Para usar el servicio ocupa inyectarse

  constructor(private servicioHistorial:GifsService ){
    
  } 
  
  buscar(){
    const valor=(this.txtBuscar.nativeElement.value);

    if(!(valor.trim().length===0)){
      this.servicioHistorial.buscarGifs(valor);  
    }
    // document.querySelector('input').value='';
    this.txtBuscar.nativeElement.value='';
  }
}
