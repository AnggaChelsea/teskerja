import { Component, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsersService } from '../../shared/users.service'
import { Users } from 'src/app/shared/user.model'
import { NgxPaginationModule } from 'ngx-pagination'
import { DashboardChartComponent } from '../dashboard-chart/dashboard-chart.component'
import * as ApexCharts from 'apexcharts'
import { ApexOptions } from 'ng-apexcharts'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartComponent } from 'ng-apexcharts'

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts'
import { Router } from '@angular/router'
import { map } from 'rxjs'

export type ChartOptions = {
  series: ApexNonAxisChartSeries
  chart: ApexChart
  responsive: ApexResponsive[]
  labels: any
}

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgxPaginationModule,
    DashboardChartComponent,
  ],
  template: `
    <div class="container">
      <div>
        <h4>Chart Criminals in 2022</h4>
        <div id="chart" class="mt-4">
          <apx-chart
            [series]="chartOptions.series"
            [chart]="chartOptions.chart"
            [labels]="chartOptions.labels"
            [responsive]="chartOptions.responsive"
          ></apx-chart>
        </div>
        <button
          (click)="showListUser()"
          class="btn btn-outline-primary justify-center"
        >
          <span *ngIf="!showCriminals">Check</span>
          <span *ngIf="showCriminals">Close</span>
          Information Criminals
        </button>
      </div>
      <div *ngIf="showCriminals" class="card w-47  h-47">
        <div *ngIf="error" class="alert alert-danger" role="alert">
          Data Server Mockup Error try refresh
        </div>
        <div *ngIf="isLoading" class="lds-dual-ring"></div>
        <div>
          <div
            *ngFor="
              let item of dataUser
                | paginate
                  : {
                      itemsPerPage: itemsPerPage,
                      currentPage: page,
                      totalItems: totalItems
                    }
            "
            class="content-card"
            (click)="clickToDetail(item.id)"
          >
            <img [src]="item.avatar" alt="" />
            <div class="name">
              <strong>{{ item.name }}</strong>
              <br />
              <hr />
              <small>Join Date</small>
              <p>{{ item.createdAt | date }}</p>
            </div>
          </div>
        </div>
        <pagination-controls
          *ngIf="showCriminals"
          class="pagi"
          (pageChange)="page = $event"
        ></pagination-controls>
      </div>
    </div>
  `,
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  @ViewChild('chart') chart?: ChartComponent
  public chartOptions: Partial<ChartOptions>
  dataUser: any
  page: number = 1
  itemsPerPage = 6
  totalItems: any
  error = false
  isLoading = false
  showCriminals = false
  losePrice: any = []
  userFirebase: any
  totalItemsFire: any
  constructor(private userService: UsersService, private router: Router) {
    this.chartOptions = {
      series: [44, 55, 13],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Lose Price more $800k', 'Money less then $500k', '0'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    }
  }

  ngOnInit(): void {
    this.doListUsers()
    this.getCriminals()
  }

  doListUsers() {
    this.isLoading = true
    this.userService.getDataUser().subscribe(
      (value: any) => {
        this.dataUser = value
        this.doShareData(value)
        this.page = 0
        this.totalItems = value.length
        this.isLoading = false
        for (let i = 0; i < value.length; i++) {
          this.losePrice.push(value[i].month)
        }
        console.log(this.losePrice)
        const bulanbanyak: any = {}
        for (let i = 0; i < this.losePrice.length; i++) {
          let month = this.losePrice[i]
          if (bulanbanyak[month]) {
            bulanbanyak[month]++
          } else {
            bulanbanyak[month] = 1
          }
        }
        let maxCount = 0
        let maxMonth = ''

        for (let month in bulanbanyak) {
          if (bulanbanyak[month] > maxCount) {
            maxCount = bulanbanyak[month]
            maxMonth = month
          }
        }
        console.log(`Bulan dengan jumlah kemunculan terbanyak adalah ${maxMonth} dengan jumlah ${maxCount}`);
      },
      (error) => {
        this.error = true
      },
    )
  }

  showListUser() {
    this.showCriminals = !this.showCriminals
  }

  getPrice(price: any) {
    console.log(price)
  }

  clickToDetail(id: any) {
    this.userService.shareDataUserDetali(id)
    this.router.navigate([`/view-detail/${id}`])
  }
  getCriminals() {
    this.userService
      .getDataCriminalsFirebase()
      .pipe(
        map((item: any) => {
          const dataArr = []
          for (let key in item) {
            dataArr.push({ ...item[key], id: key })
          }
          return dataArr
        }),
      )
      .subscribe((res: any) => {
        console.log(res)
        this.userFirebase = res
        this.totalItemsFire = res.length
      })
  }

  doShareData(data: any) {
    this.userService.shareData(data)
  }
}
