import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderEditDto } from 'src/app/Dtos/Dashboard/OrderEditDto';
import { OrderStatusEnum } from 'src/app/Dtos/Dashboard/OrderStatusEnum';
import { OrderService } from 'src/app/services/Dashboard/order.service';

@Component({
  selector: 'app-order-edit-dashboard',
  templateUrl: './order-edit-dashboard.component.html',
  styleUrls: ['./order-edit-dashboard.component.css'],
})
export class OrderEditDashboardComponent implements OnInit {
  Id: any;
  enumValues = Object.keys(OrderStatusEnum);
  selectedValue :any;

  constructor(
    private readonly orderService: OrderService,
    private readonly route: ActivatedRoute,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    console.log(this.enumValues);
  }

  EditOrder() {
    var credentials = new OrderEditDto();
    credentials.id = this.Id;
    credentials.orderStatus = this.selectedValue

    console.log(credentials);

    this.orderService.EditOrder(credentials).subscribe({
      next: () => {
        this.routerService.navigateByUrl('/dashboard/orders/' + this.Id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}