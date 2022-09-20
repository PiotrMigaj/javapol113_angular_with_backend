import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Auction } from 'src/app/model/auction';


@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit, OnChanges, AfterViewInit  {
  displayedColumns:string[] = [];


  @Input("auctionList") auctionList: Auction[] = [];
  @Input() totalElements: number = 0;
  @Input() loadingList: boolean = false;
  @Input() loadingDetailsButton: boolean|null = null;

  @Output() pageChanged = new EventEmitter<PageEvent>;

  constructor(private router: Router,private cdr: ChangeDetectorRef) { 
    
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.changePage({
      pageSize: 5,
      pageIndex: 0,
      length: 0
    })
    this.setDisplayDefColumnsArray();
  }

  private setDisplayDefColumnsArray():void{
    if(this.loadingDetailsButton===true){
      this.displayedColumns = [
        "auction-id",
        "product-id",
        "auction-title",
        "initial-price",
        "auction-start-time",
        "auction-end-time",
        "auction-details-btn"
      ]
    }
    if(this.loadingDetailsButton===false){
      this.displayedColumns = [
        "auction-id",
        "product-id",
        "auction-title",
        "initial-price",
        "auction-start-time",
        "auction-end-time"
      ]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  

  auctionDetails(auctionId: number): void {
    this.router.navigate(['/product/details',auctionId])
  }

  changePage(pageEvent?: PageEvent) {
    console.log('Page has been changed')
    this.pageChanged.emit(pageEvent);
  }
}
