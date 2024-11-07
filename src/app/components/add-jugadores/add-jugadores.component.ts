import { Component, EventEmitter, inject, Output } from '@angular/core';
import { jugador } from '../../interfaces/jugadores.interface';
import { JugadoresService } from '../../services/jugadores.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-add-jugadores',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavBarComponent],
  templateUrl: './add-jugadores.component.html',
  styleUrl: './add-jugadores.component.css'
})
export class AddJugadoresComponent {
  @Output()
  emitirJugador : EventEmitter<jugador> = new EventEmitter();
  
  fb = inject(FormBuilder);
  jugadorService = inject(JugadoresService);
  
  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    edad: [0, [Validators.required]],
    posicion: ['', [Validators.required]]
  })

  agregarJugador(){
    if(this.formulario.invalid) console.log("Error en el formulario.") ;

    const jugador = this.formulario.getRawValue();
    this.agregarJugadorDb(jugador);
    this.emitirJugador.emit(jugador);
  }

  agregarJugadorDb(jugador : jugador){
    this.jugadorService.postJugadores(jugador).subscribe({
      next: (jugador: jugador) =>{
        console.log(jugador);
        alert('Jugador guardado...');
      },
      error:(e: Error) =>{
        console.log(e.message);
      }
    })
  }
}
