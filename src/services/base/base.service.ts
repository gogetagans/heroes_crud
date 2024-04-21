import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(
    protected http: HttpClient,
    protected loaderService: LoaderService
  ) {}
}
