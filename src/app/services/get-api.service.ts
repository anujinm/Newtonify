import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetApiService {

  constructor(public http: HttpClient) { }
  get_api(url) {
    return this.http.get(url);
  }
}
