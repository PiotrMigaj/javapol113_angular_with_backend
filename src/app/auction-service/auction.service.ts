import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auction, CreateAuctionRequest } from '../model/auction';
import { PageResponse } from '../model/pagination';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private httpClient: HttpClient) {

  }

  getAuctionsFromBackend(page: number, size: number): Observable<PageResponse<Auction>> {
    const params = {
      page: page,
      size: size
    }

    return this.httpClient
      .get<PageResponse<Auction>>('http://localhost:8080/api/auction', {
        params: params
      });
  }

  getDefaultCreateAuctionRequest():CreateAuctionRequest{
    return {
      productId: null,
      title: '',
      initialPrice: 0,
      startDateTime: '',
      durationInDays: 0
    }
  }
}
