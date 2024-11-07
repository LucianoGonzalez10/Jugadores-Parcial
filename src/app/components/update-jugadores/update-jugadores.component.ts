import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JugadoresService } from '../../services/jugadores.service';
import { jugador } from '../../interfaces/jugadores.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-jugadores',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-jugadores.component.html',
  styleUrl: './update-jugadores.component.css'
})
export class UpdateJugadoresComponent {
  @Output()
  emitirJugador: EventEmitter<jugador> = new EventEmitter();

  fb = inject(FormBuilder);
  jugadorService = inject(JugadoresService);
  route = inject(ActivatedRoute);

  jugadorId: string | null = null;

  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    edad: [0, [Validators.required]],
    posicion: ['', [Validators.required]]
  });

  constructor() {
    this.jugadorId = this.route.snapshot.paramMap.get('id');
  }

  actualizarJugador() {
    if (this.formulario.invalid) {
      console.log("Error en el formulario.");
      return;
    }

    const jugador = this.formulario.getRawValue();
    if (this.jugadorId) {
      this.actualizarJugadorDb(jugador, this.jugadorId);
    }
  }

  actualizarJugadorDb(jugador: jugador, id: string) {
    this.jugadorService.putJugadores(jugador, id).subscribe({
      next: (jugador: jugador) => {
        console.log(jugador);
      },
      error: (err) => {
        console.error('Error al actualizar el jugador:', err);
      }
    });
  }
}