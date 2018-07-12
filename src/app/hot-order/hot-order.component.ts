import { Component, OnInit } from '@angular/core';
import {FetchOrdersService} from "../fetch-orders.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hot-order',
  templateUrl: './hot-order.component.html',
  styleUrls: ['./hot-order.component.scss']
})
export class HotOrderComponent implements OnInit {

  par;
  constructor(private websocketOrdersList:FetchOrdersService,
              private route: ActivatedRoute
              ) {}

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap(
        (params:ParamMap) => this.websocketOrdersList.getOrderOne(parseInt(params.get('order_id')))
      )
    ).subscribe( sub => {this.par = sub; console.log(sub)})
  }
}

