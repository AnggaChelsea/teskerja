import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Users } from './user.model';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dataUser = new Subject<any>()
  dataDetail = this.dataUser.asObservable()
  private allUser = new Subject<any>()
  dataAllUser = this.allUser.asObservable()
  constructor(private http: HttpClient) { }


  getDataUser(): Observable<Users>{
    return this.http.get<Users>(`${environment.api}test`) as Observable<Users>
  }
  createDataUser(data: any): Observable<Users>{
    return this.http.post<Users>(`${environment.api}test`, data) as Observable<Users>
  }
  createDataUserPut(id: any, data: any): Observable<Users>{
    return this.http.put<Users>(`${environment.api}test/${id}`, data) as Observable<Users>
  }
  doRemove(id: any){
    return this.http.delete(`${environment.api}test/${id}`)
  }
  shareDataUserDetali(idData: any){
    return this.dataUser.next(idData)
  }
  shareData(body: any){
    return this.allUser.next(body)
  }

  dataUserDetail(id: any){
    return this.http.get(`${environment.api}test/${id}`)
  }
  getDataCriminalsFirebase(){
    return this.http.get(`${environment.firebase}/criminals.json`)
  }

  getDataCriminalsFirebaseId(id: any){
    return this.http.get(`${environment.firebase}/criminals/${id}`)
  }

  addUserCriminal(body: any){
    return this.http.post(`${environment.firebase}/criminals.json`, body)
  }
}
