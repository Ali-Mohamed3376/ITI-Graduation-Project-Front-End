import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderEditDto } from 'src/app/Dtos/Dashboard/OrderEditDto';
import { OrderService } from 'src/app/services/Dashboard/order.service';

@Component({
  selector: 'app-order-edit-dashboard',
  templateUrl: './order-edit-dashboard.component.html',
  styleUrls: ['./order-edit-dashboard.component.css'],
})
export class OrderEditDashboardComponent implements OnInit {
  selected = 0;
  Id: any;
  Order: any;
  EditError: any;
  // dateControl: FormControl = new FormControl();
  // defaultDate: Date = new Date();

  constructor(
    private readonly orderService: OrderService,
    private readonly route: ActivatedRoute,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    // this.dateControl.setValue(this.defaultDate);

    this.Id = this.route.snapshot.params['id'];
    this.orderService.GetOrderDetails(this.Id).subscribe({
      next: (data) => {
        this.Order = data;
        this.selected = this.Order.orderStatus;
        // this.dateControl.setValue(new Date(this.Order.deliverdDate));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  EditOrder() {
    var credentials = new OrderEditDto();
    credentials.id = this.Id;
    credentials.orderStatus = this.selected
    credentials.deliverdDate = new Date(Date.now());

    console.log(credentials);

    this.orderService.EditOrder(credentials).subscribe({
      next: () => {
        // this.routerService.navigateByUrl('/dashboard/orders/' + this.Id);
      },
      error: (error) => {
        this.EditError = error;
        console.log(error);
      },
    });
  }
}