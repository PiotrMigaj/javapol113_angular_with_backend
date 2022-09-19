import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuctionService } from '../auction-service/auction.service';
import { CreateAuctionRequest } from '../model/auction';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.css']
})
export class AuctionFormComponent implements OnInit {

  createAuctionRequest: CreateAuctionRequest;
  sendingProduct: boolean = false;

  notification: string|null = null;

  constructor(private renderer: Renderer2,
              private router: Router,
              private auctionService: AuctionService,
              private snackBar: MatSnackBar) {
    this.createAuctionRequest = auctionService.getDefaultCreateAuctionRequest()
  }

  ngOnInit(): void {
  }

  clearForm(): void {
    this.createAuctionRequest = this.auctionService.getDefaultCreateAuctionRequest()
  }

}
