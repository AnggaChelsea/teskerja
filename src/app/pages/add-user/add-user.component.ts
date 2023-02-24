import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms'
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container">
    <div *ngIf="success" class="alert alert-success" role="alert">
          Data added crimals success
        </div>
      <form class="mb-4" #form="ngForm" (ngSubmit)="addUser(form)">
        <div class="form-group mb-4">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            ngModel
            name="name"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />

        </div>
        <div class="form-group mb-4">
          <label for="crimalsFor">criminal for</label>
          <input
            type="text"
            class="form-control"
            ngModel
            name="criminalfor"
            id="crimalsFor"
            placeholder="ex: cat"
          />
        </div>
        <div class="form-group mb-4">
          <label for="losePrice">Lose Price</label>
          <input
            type="text"
            class="form-control"
            id="losePrice"
            ngModel name="losePrice"
            placeholder="Enter lose Price"
          />

        </div>
        <div class="form-group mb-4">
          <label for="description">Description Criminals Animals</label>
          <textarea type="text" ngModel name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div class="form-group mb-4">
          <label for="losePrice">Image Link</label>
          <input
            type="text"
            class="form-control"
            id="losePrice"
            ngModel
            [(ngModel)]="image"
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
  `,
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  isLoading = false
  success = false;
  image: any
  month: any;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  addUser(form: NgForm) {
    this.isLoading = true;
    const d = new Date();
    const conditionMonth = d.getMonth() + 1
    switch(conditionMonth){
        case 1:
        this.month = 'January'
        break;
        case 2:
        this.month = 'February'
        break;
        case 3:
        this.month = 'March'
        break;
        case 4:
        this.month = 'April'
        break;
        case 5:
        this.month = 'Mei'
        break;
        case 6:
        this.month = 'Juny'
        break;
        case 7:
        this.month = 'July'
        break;
        case 8:
        this.month = 'August'
        break;
        case 9:
        this.month = 'September'
        break;
        case 10:
        this.month = 'October'
        break;
        case 11:
        this.month = 'November'
        break;
        case 12:
        this.month = 'December'
        break;
    }
    const body = {
      name: form.value.name,
      criminalfor: form.value.criminalfor,
      losePrice: form.value.losePrice,
      description: form.value.description,
      image: form.value.image,
      createdAt: Date.now(),
      month: this.month
    }
    this.userService.createDataUser(body).subscribe((res: any) => {
      form.resetForm();
      this.success = true
      this.isLoading = false;
      setTimeout(() => {
        this.success = false;
      }, 30000)
    })
  }

//   addUserMoc(form: NgForm) {
//     this.isLoading = true;
//     const body = {
//       name: form.value.name,
//       criminalfor: form.value.criminalfor,
//       losePrice: form.value.losePrice,
//       description: form.value.description,
//       image: form.value.image
//     }
//     console.log(body)
//     // this.userService.addUserCriminal(body).subscribe((res: any) => {
//     //   // form.resetForm();
//     //   this.success = true
//     //   this.isLoading = false;
//     //   setTimeout(() => {
//     //     this.success = false;
//     //   }, 30000)
//     // })
//   }
}

