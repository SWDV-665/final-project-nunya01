import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addItem(item: Item): Observable<any> {
    return this.http.post<Item>('http://localhost:3000/api/create-item', item, this.httpOptions)
      .pipe(
        catchError(this.handleError<Item>('Add Item'))
      );
  }

  getItem(id): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api/get-item/' + id)
      .pipe(
        tap(_ => console.log(`Item fetched: ${id}`)),
        catchError(this.handleError<Item[]>(`Get Item id=${id}`))
      );
  }

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/api')
      .pipe(
        tap(items => console.log('Items fetched!')),
        catchError(this.handleError<Item[]>('Get Items', []))
      );
  }

  updateItem(id, item: Item): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-item/' + id, item, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Item updated: ${id}`)),
        catchError(this.handleError<Item[]>('Update Item'))
      );
  }

  deleteItem(id): Observable<Item[]> {
    return this.http.delete<Item[]>('http://localhost:3000/api/delete-item/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Item deleted: ${id}`)),
        catchError(this.handleError<Item[]>('Delete Item'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
