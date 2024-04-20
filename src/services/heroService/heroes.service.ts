import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { API_URL } from '../../environment';
import MessageService from '../messageService/message.service';


@Injectable({
  providedIn: 'root',
})
/**
 * Service for managing heroes.
 */
export class HeroesService {
  readonly api_url = API_URL;
  private heroesObs$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private heroes: Hero[] = [];
  private filteredHeroes: Hero[] = [];

  get heroes$(): Observable<Hero[]> {
    return this.heroesObs$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes() {
    this.http
      .get<Hero[]>(`${this.api_url}/heroes`)
      .pipe(
        catchError(() => {
          this._handleError();
          return [];
        })
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.heroesObs$.next(this.heroes);
      });
  }

  /**
   * Finds heroes based on the provided search string.
   * If no search string is provided, all heroes are returned.
   *
   * @param search - The search string to filter heroes by.
   */
  findHeroes(search: string | null) {
    if (!search) {
      this.heroesObs$.next(this.heroes);
      return;
    }
    this.filteredHeroes = [...this.heroes];
    this.filteredHeroes = this.heroes.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
    this.heroesObs$.next(this.filteredHeroes);
  }

  /**
   * Gets a hero by ID.
   * @param id - The ID of the hero to get.
   * @returns An observable of the hero.
   */
  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.api_url}/heroes/${id}`).pipe(
      catchError(() => {
        this._handleError();
        return [];
      })
    );
  }

  /**
   * Adds a new hero.
   * @param hero - The hero to add.
   * @returns An observable of the added hero.
   */
  addHero(hero: Hero): void {
    this.http
      .post<Hero>(`${this.api_url}/heroes`, hero)
      .pipe(
        catchError(() => {
          this._handleError();
          return [];
        })
      )
      .subscribe(() => {
        this._handleSuccess('Hero added successfully');
        this.getHeroes();
      });
  }

  /**
   * Updates a hero.
   * @param hero - The hero to update.
   * @returns An observable of the updated hero.
   */
  updateHero(hero: Hero): void {
    this.http
      .put<Hero>(`${this.api_url}/heroes/${hero._id}`, hero)
      .pipe(
        catchError(() => {
          this._handleError();
          return [];
        })
      )
      .subscribe(() => {
        this._handleSuccess('Hero updated successfully');
        this.getHeroes();
      });
  }

  /**
   * Deletes a hero.
   * @param id - The ID of the hero to delete.
   */
  deleteHero(id: string): void {
    this.http
      .delete<Hero>(`${this.api_url}/heroes/${id}`)
      .pipe(
        catchError(() => {
          this._handleError();
          return [];
        })
      )
      .subscribe(() => {
        this._handleSuccess('Hero deleted successfully');
        this.getHeroes();
      });
  }

  /**
   * Handles the error response from an HTTP request.
   * @returns A function that takes an `HttpErrorResponse` object as a parameter and handles the error.
   */
  private _handleError(): (error: HttpErrorResponse) => void {
    this.messageService.showMessage('An error occurred. Please try again later.');

    return ({ error }: HttpErrorResponse) => {
      if (error instanceof Event) {
        throw error;
      }
    };
  }

  /**
   * Handles the success of an operation and displays a message using the message service.
   * @param message - The success message to display.
   */
  private _handleSuccess(message: string): void {
    this.messageService.showMessage(message);
  }
}
