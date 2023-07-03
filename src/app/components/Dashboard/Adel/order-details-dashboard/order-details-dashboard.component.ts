import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/Dashboard/order.service';

@Component({
  selector: 'app-order-details-dashboard',
  templateUrl: './order-details-dashboard.component.html',
  styleUrls: ['./order-details-dashboard.component.css']
})

export class OrderDetailsDashboardComponent {

  Order: any;
  Id: any;

  constructor(private readonly route: ActivatedRoute, private readonly OrderService: OrderService) {
    this.getUser()
    
  }

  public getUser() {
    this.Id = this.route.snapshot.params['id'];
    this.OrderService.GetOrderDetails(this.Id).subscribe({
      next: (data) => {
        console.log(data)
        this.Order = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
