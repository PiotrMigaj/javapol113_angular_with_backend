export type Auction = {
  auctionId: number;
  productId: number;
  title: string;
  initialPrice: number;
  startDateTime: string;
  endDateTime: string
}

export type CreateAuctionRequest = {
  productId: number|null;
  title: string;
  initialPrice: number;
  startDateTime: string;
  durationInDays: number;
}
