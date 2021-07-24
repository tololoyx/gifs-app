import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' 
})
export class GifsService {

  private apiKey:string='wOjWtI6Xy2FMVcrChAcPdA7J46TlteEk';
  private _historial:string[]=[];
  private servicioUrl:string="https://api.giphy.com/v1/gifs";

  // TODO: Cambiar any por su tipo correspondiente
  public resultados:Gif[]=[];

  get historial(){
    return [...this._historial]; //Si se mete en las llaves mas los puntos (spret operator) , se rompe la referencia y solo da una copia
  }
  
  constructor(private http:HttpClient){
    // this._historial=localStorage.getItem('historial');
    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!)//Con ese signo de admiración decimos que estamos seguros de que 
    //                                                                //no obtendremos null , ya que validamos con el if
    // }
    this._historial=JSON.parse(localStorage.getItem('historial')!)||[]
    //Guarda en el historial , el historial almacenado en local storage , si te da null retorna un arreglo vacio. Confia en que así será
    this.resultados=JSON.parse(localStorage.getItem('ultimo')!)
  }

  buscarGifs(query:string)
  {
    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      
      localStorage.setItem('historial',JSON.stringify(this._historial));
    
    }
    
    const params=new HttpParams()
      .set('api_key',this.apiKey)
      .set('q',query)
      .set('limit','10');
    
    

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp)=>{//De esta forma le digo a Ts que el tipo de respuesta no importa ya que se que sera tipo data
        console.log(resp.data);
        this.resultados=resp.data;
        localStorage.setItem("ultimo",JSON.stringify(this.resultados));
      })
  }  


  
}
