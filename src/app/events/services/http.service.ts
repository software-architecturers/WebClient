import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public getEvents() {
    return this.http.get<any>(`${apiUrl}/api/events`);
  }

  public getEventById(id) {
    return this.http.get<any>(`${apiUrl}/api/events/${id}`);
  }

  public addEvent(event) {
    return this.http.post<any>(`${apiUrl}/api/events/add`, event);
  }

  public removeEvent(id) {
    return this.http.delete(`${apiUrl}/api/events/delete/${id}`);
  }

  public updateEvent(id, event) {
    return this.http.put<any>(`${apiUrl}/api/events/update/${id}`, event);
  }

  public searchEvent(search) {
    return this.http.get<any>(`${apiUrl}/api/events/find/${search}`);
  }

  public likeEvent(id) {
    return this.http.put<any>(`${apiUrl}/events/like`, {id});
  }

}

