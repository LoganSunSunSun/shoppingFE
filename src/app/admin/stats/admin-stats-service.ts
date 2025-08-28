import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TopProduct } from './admin-stats/admin-stats';


@Injectable({
  providedIn: 'root'
})
export class AdminStatsService {

  private top3 = 'http://localhost:8080/api/admin/summary/top-3-products';
  private totalSoldUrl = 'http://localhost:8080/api/admin/summary/total-sold';

  constructor(private http: HttpClient) {}

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  getTop3Products(): Observable<TopProduct[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[][]>(this.top3, this.getAuthHeader()).pipe(
      map(res =>
        res.map(item => ({
          productId: item[0],
          name: item[1],
          timesPurchased: item[2]
        }))
      )
    );
  }

  getTotalSoldItems(): Observable<number> {
    return this.http.get<number>(this.totalSoldUrl, this.getAuthHeader());
  }
}