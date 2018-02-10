import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";

import * as pizzasActions from '../actions';
import * as fromServices from '../../services';
import { of } from "rxjs/observable/of";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService.getPizzas()
          .pipe(
            map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
        )
      })
    )
}
