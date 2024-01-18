import { Injectable } from '@angular/core';
import { RestApiService } from './api/rest-api.service';
import { IApiResult } from '../interfaces/response-service.interface';
import { Iuser } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _api: RestApiService,
  ) { }

  getCustomer(guid: string) : Promise<IApiResult<Iuser>>{
    return this._api.get(`Customers/GetCustomerByGuid/${guid}`);
  }

  postCustomer(body: UserModel) : Promise<IApiResult<any>>{
    return this._api.post('Customers/AddCustomer', body);
  }

  putCustomer(body: UserModel): Promise<IApiResult<any>>{
    return this._api.put('Customers/UpdateCustomer', body);
  }

}
