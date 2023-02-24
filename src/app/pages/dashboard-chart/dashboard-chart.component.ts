import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ListPageComponent } from '../list-page/list-page.component';

import { NgApexchartsModule } from 'ng-apexcharts'
import { UsersService } from '../../shared/users.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule, ListPageComponent, NgApexchartsModule],
  template: `
    <div class="container">
          <div class="content">
            <app-list-page></app-list-page>
            <div id="chart">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [dataLabels]="chartOptions.dataLabels"
    [plotOptions]="chartOptions.plotOptions"
    [yaxis]="chartOptions.yaxis"
    [xaxis]="chartOptions.xaxis"
    [fill]="chartOptions.fill"
    [title]="chartOptions.title"
  ></apx-chart>
</div>

          </div>
    </div>
  `,
  styles: [
  ]
})
export class DashboardChartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  dataMonth: any = []
  cartData:any = []
  dataNilaiMonth: any = []
  getArrData:any
  arrNilai: any;
  constructor(private userService: UsersService) {

  }

  ngOnInit(): void {
    const dataA = [1,2,3,4,5,6,7,5,4,4,3]
    console.log(typeof(dataA), 'data ar')
    this.userService.dataAllUser.subscribe((value: any) => {
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        this.dataMonth.push(value[i].month)
      }
      console.log(this.dataMonth)
      const bulanbanyak: any = {}
      for (let i = 0; i < this.dataMonth.length; i++) {
        let month = this.dataMonth[i]
        if (bulanbanyak[month]) {
          bulanbanyak[month]++
        } else {
          bulanbanyak[month] = 1
        }
      }
      for(let month in bulanbanyak ){
        console.log(`${month} : ${bulanbanyak[month]}`)
        this.dataMonth.push(month)
        this.dataNilaiMonth.push(bulanbanyak[month])
        console.log(this.dataNilaiMonth)
      }
      console.log(this.dataNilaiMonth, 'didalam')
      this.getArrData = this.dataNilaiMonth

      let maxCount = 0
      let maxMonth = ''
      for (let month in bulanbanyak) {
        if (bulanbanyak[month] > maxCount) {
          maxCount = bulanbanyak[month]
          maxMonth = month
        }
      }
      console.log(`Bulan dengan jumlah kemunculan terbanyak adalah ${maxMonth} dengan jumlah ${maxCount}`);
    })
    console.log('diluar', this.getArrData)



    const dataw = [1,2,3,4,5,6,7,5,4,4,3]
    console.log(dataw)
    console.log(this.dataNilaiMonth)
    this.chartOptions = {
      series: [
        {
          name: "Inflation",
          data: dataw
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
      },
      title: {
        text: "Monthly Inflation in Criminals,",
        floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };


  }

}
