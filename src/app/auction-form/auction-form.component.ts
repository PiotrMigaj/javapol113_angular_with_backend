import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../auction-service/auction.service';
import { CreateAuctionRequest } from '../model/auction';
import { TMP_PRODUCT_ID } from '../model/constants';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.css']
})
export class AuctionFormComponent implements OnInit {

  @ViewChild('ref') child: ElementRef|any;

  createAuctionRequest: CreateAuctionRequest;
  sendingAuction: boolean = false;

  notification: string|null = null;

  constructor(private renderer: Renderer2,
              private router: Router,
              private auctionService: AuctionService,
              private snackBar: MatSnackBar,
              private route:ActivatedRoute) {
    this.createAuctionRequest = auctionService.getDefaultCreateAuctionRequest()
    this.createAuctionRequest.productId = Number(this.route.snapshot.paramMap.get('productId'));
    console.log(`productId from auction form: ${this.createAuctionRequest.productId}`);
  }

  ngOnInit(): void {
  }

  sendAuction(): void {
    this.sendingAuction = true;
    console.log(this.createAuctionRequest);
    this.auctionService.sendAuctionToBackend(this.createAuctionRequest)
      .subscribe({ // promise
        next: (data) => {
          this.sendingAuction = false;
          this.snackBar.open('Auction has been added', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            duration: 5000
          })
          this.router.navigate(['/product/details',this.createAuctionRequest.productId])
          console.log(data)
        },
        error: (error) => {
          this.sendingAuction = false;
          this.notification = error.message
          setTimeout(() => {
            this.renderer.addClass(this.child.nativeElement, 'hidden');
            setTimeout(() => {
              this.notification = null;
            }, 1000)
          }, 3000)
        }
      })
  }

  clearForm(): void {
    this.createAuctionRequest = this.auctionService.getDefaultCreateAuctionRequest()
  }

}
