import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderDto {
  symbol: string;
  side: string;
  quantity: number;
  price: number;
}

export interface FixOrderResultDto {
  status: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private readonly http: HttpClient) {}

  sendOrder(order: OrderDto): Observable<FixOrderResultDto> {
    return this.http.post<FixOrderResultDto>(this.apiUrl, order);
  }
}
