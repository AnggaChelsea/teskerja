import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { ListPageComponent } from '../../pages/list-page/list-page.component'
import { AddUserComponent } from '../../pages/add-user/add-user.component'
import { UsersService } from '../../shared/users.service'
import { ViewUserComponent } from '../../pages/view-user/view-user.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgbNavModule, ListPageComponent, AddUserComponent, ViewUserComponent, RouterModule],
  template: `
  <div class="container">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand ml-4" href="#">Navbar</a>
  <div class="collapse navbar-collapse container" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" routerLink="">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="add-user-criminals">Add Criminals</a>
      </li>
    </ul>
  </div>
    </nav>
  </div>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  active = 'top'
  view = false
  id: any
  constructor(private userService: UsersService, private activrout: ActivatedRoute) {
    this.userService.dataDetail.subscribe(data => {
      if(data){
        this.view = true;
      }
    })
    this.id = this.activrout.snapshot.paramMap.get('id')
    if(this.id){
      this.view = true
    }
    console.log(this.view)
    console.log(this.id)

  }

  ngOnInit(): void {
    this.id = this.activrout.snapshot.paramMap.get('id')
    if(this.id){
      this.view = true
    }
    console.log(this.view)
    console.log(this.id)
  }
}
