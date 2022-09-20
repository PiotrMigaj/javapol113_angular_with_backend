import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuctionService } from 'src/app/auction-service/auction.service';
import { Auction } from 'src/app/model/auction';
import { PageResponse } from 'src/app/model/pagination';

@Component({
  selector: 'app-all-auction-list',
  templateUrl: './all-auction-list.component.html',
  styleUrls: ['./all-auction-list.component.css']
})
export class AllAuctionListComponent implements OnInit {
  auctionPageResponse: PageResponse<Auction> = {
    content: [],
    totalElements: 0
  }

  loadingList: boolean = false;
  loadingDetailsButton: boolean = true;

  constructor(private auctionService: AuctionService) {

  }

  ngOnInit(): void {
  }

  getAuctionsFromBackend(page: number, size: number): void {
    this.loadingList = true;
    this.auctionService.getAuctionsFromBackend(page, size)
    .subscribe({
      next: (data) =>{
        this.loadingList = false;
        console.log(data)
        this.auctionPageResponse = data;
      },
      error: (error) => {
        console.log(error)

      }
    })
  }

  loadChangedPage(pageEvent: PageEvent): void{
    this.getAuctionsFromBackend(pageEvent.pageIndex, pageEvent.pageSize);
  }
}
