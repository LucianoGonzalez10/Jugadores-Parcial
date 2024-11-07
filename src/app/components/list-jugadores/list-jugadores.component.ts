import { Component, inject, OnInit } from '@angular/core';
import { jugador } from '../../interfaces/jugadores.interface';
import { JugadoresService } from '../../services/jugadores.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AddJugadoresComponent } from './../add-jugadores/add-jugadores.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-jugadores',
  standalone: true,
  imports: [NavBarComponent, AddJugadoresComponent, RouterLink],
  templateUrl: './list-jugadores.component.html',
  styleUrl: './list-jugadores.component.css'
})
export class ListJugadoresComponent implements OnInit {
  ngOnInit(): void {
      this.listarJugadores();
  }

  jugadoresService = inject(JugadoresService);
  listaJugadores : jugador[] = [];

  agregarJugador(jugador: jugador){
    this.listaJugadores.push(jugador);
  }

  listarJugadores(){
    this.jugadoresService.getJugadores().subscribe({
      next: (jugador: jugador[]) =>{
        this.listaJugadores = jugador;
      },
      error: (e: Error) =>{
        console.log(e.message);
      }
    })
  }

  eliminarJugador(id: number | undefined){
    this.jugadoresService.deleteJugadores(id).subscribe({
      next: () =>{
        this.listarJugadores();
      },
      error: (e: Error) =>{
        console.log(e.message);
      }
    })
  }
}
