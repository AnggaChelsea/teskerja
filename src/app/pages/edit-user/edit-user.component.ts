import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../shared/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="content-card">
        <h4>Criminal Detail Edit</h4>
        <img [src]="data?.avatar" alt="" />
        <form class="mb-4" #form="ngForm" (ngSubmit)="editData(form)">
        <div class="form-group mb-4">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            ngModel
            name="name"
            id="name"
            [value]="data?.name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />

        </div>

        <div class="form-group mb-4">
          <label for="losePrice">Lose Price</label>
          <input
            type="text"
            class="form-control"
            id="losePrice"
            [value]="data?.losePrice"
            ngModel name="losePrice"
            placeholder="Enter lose Price"
          />

        </div>
        <div class="form-group mb-4">
          <label for="description">Description Criminals Animals</label>
          <textarea type="text" ngModel [value]="data?.description" name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div class="form-group mb-4">
          <label for="avatar">Image Link</label>
          <input
            type="text"
            class="form-control"
            id="avatar"
            ngModel
            [(ngModel)]="image"
            [value]="data?.avatar"
            name="image"
            placeholder="https://"
          />
        </div>

        <div *ngIf="image">
          <img src="{{image}}" width="89" height="80" style="border-radius: 5px; margin-bottom:10px" alt="">
        </div>

        <button type="submit" class="btn btn-primary">
          <span *ngIf="!isLoading">Submit</span>
          <span *ngIf="isLoading">Loading ....</span>
        </button>
      </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class EditUserComponent implements OnInit {
  data: any;
  id: any;
  image: any
  isLoading = false;

  constructor(private userService: UsersService,  private activrout: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.activrout.snapshot.paramMap.get('id')
    this.getDetail()
  }

  editData(form: NgForm){
    this.isLoading = true
    const data = {
      name: form.value.name,
      losePrice: form.value.losePrice,
      description: form.value.description ? form.value.description : this.data.description,
      avatar: form.value.avatar
    }
    this.userService.createDataUserPut(this.id, data).subscribe((value:any) => {
      this.isLoading = false
    })
  }
  getDetail() {
    this.userService.dataUserDetail(this.id).subscribe((value: any) => {
      console.log(value)
      this.data = value
    })
  }
}
