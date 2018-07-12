import {Component, OnInit} from '@angular/core';
import {FetchOrdersService} from "../fetch-orders.service";
import { Order } from '../order-interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  constructor(private websocketOrdersList:FetchOrdersService) {}

  ordersList:Array<Order> = [];

  ngOnInit() {

    this.websocketOrdersList.createObservableSocket("ws://localhost:8085").
    subscribe(this.websocketOrdersList.orderOne$);

    this.websocketOrdersList.orderOne$.
    subscribe(data =>  {
      console.log(data);
      this.ordersList.push(data);
      this.websocketOrdersList.storageO = this.ordersList;
    });

    this.websocketOrdersList.orderOne$.
    subscribe((order:any) => {console.log(order); this.websocketOrdersList.storageOfOrders.next( order )})
  }

  deleteOrder(order)  {
    let index = this.ordersList.indexOf(order);
    this.ordersList.splice(index, 1);
  }

}
