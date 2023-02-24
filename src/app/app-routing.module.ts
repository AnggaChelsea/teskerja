import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DashboardChartComponent } from './pages/dashboard-chart/dashboard-chart.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'view-detail/:id',
    component: ViewUserComponent
  },
  {
    path: 'add-user-criminals',
    component: AddUserComponent
  },
  {
    path: '',
    component: DashboardChartComponent
  },
  {
    path: 'edit/:id',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
