import { Routes } from '@angular/router';
import { AddJugadoresComponent } from './components/add-jugadores/add-jugadores.component';
import { ListJugadoresComponent } from './components/list-jugadores/list-jugadores.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UpdateJugadoresComponent } from './components/update-jugadores/update-jugadores.component';

export const routes: Routes = [
    {
        path: "agregar-jugador",
        component: AddJugadoresComponent
    },
    {
        path: "lista-jugadores",
        component: ListJugadoresComponent
    },
    {
        path: "actualizar-jugador/:id",
        component: UpdateJugadoresComponent
    }
];
