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

  private AUCTION_BASE_URL:string = "http://localhost:8080/api/auction/";

  getAuctionsFromBackend(page: number, size: number): Observable<PageResponse<Auction>> {
    const params = {
      page: page,
      size: size
    }

    return this.httpClient
      .get<PageResponse<Auction>>(this.AUCTION_BASE_URL, {
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

  public sendAuctionToBackend(createAuctionRequest: CreateAuctionRequest):Observable<Auction>{
    return this.httpClient.post<Auction>(this.AUCTION_BASE_URL,createAuctionRequest);
  }
}
