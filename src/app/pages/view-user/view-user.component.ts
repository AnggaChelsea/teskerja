import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsersService } from '../../shared/users.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="content-card">
        <h4>Criminal Detail</h4>
        <img [src]="data?.avatar" alt="" />
        <div class="name">
          <strong>{{ data?.name }}</strong>
          <br />
          <hr />
          <small>Join Date</small>
          <p>{{ data?.createdAt | date }}</p>
          <div >
            <img (click)="edit(data?.id)" style="cursor: pointer" src="../../../assets/icons8-pencil-30.png" width="30" height="30" alt="">
            <img (click)="remove(data?.id)" style="margin-left:20px; cursor: pointer" src="../../../assets/icons8-remove-48 (1).png" width="30" height="30" alt="">
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        flex-direction: row;
      }
      .row2 {
        display: flex;
        flex-direction: row;
      }
    `,
  ],
})
export class ViewUserComponent implements OnInit {
  id: any
  data: any
  dataFire: any
  constructor(
    private userService: UsersService,
    private activrout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activrout.snapshot.paramMap.get('id')
    console.log(this.id)
    this.getDetail()
    this.getDetailFire()
  }

  edit(id: any){
    this.router.navigate(['/edit', id])
  }

  remove(id: any){
    this.userService.doRemove(id).subscribe(res => {
      console.log(res);
      this.router.navigate([''])
    })
  }

  getDetail() {
    this.userService.dataUserDetail(this.id).subscribe((value: any) => {
      console.log(value)
      this.data = value
    })
  }
  getDetailFire() {
    this.userService
      .getDataCriminalsFirebaseId(this.id)
      .subscribe((value: any) => {
        console.log(value)
        this.dataFire = value
      })
  }
}
