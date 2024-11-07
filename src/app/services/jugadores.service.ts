import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jugador } from '../interfaces/jugadores.interface';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http : HttpClient) { }
  urlBase = "http://localhost:3000/jugadores";

  getJugadores():Observable<jugador[]>{
    return this.http.get<jugador[]>(this.urlBase);
  }

  postJugadores(jugadorInsertar : jugador):Observable<jugador>{
    return this.http.post<jugador>(this.urlBase, jugadorInsertar);
  }

  deleteJugadores(id : number | undefined):Observable<jugador>{
    return this.http.delete<jugador>(`${this.urlBase}/${id}`);
  }

  putJugadores(jugadorInsertar : jugador, id: string):Observable<jugador>{
    return this.http.put<jugador>(`${this.urlBase}/${id}`, jugadorInsertar);
  }
}
