import { Injectable } from '@angular/core';
import  config from '../../../../assets/config/config.json';
import { SweetAlertMessageHelpers } from '../../helpers/sweet-alert-message-herlper';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  private readonly apiServer: string = config.apiServer;
  private _headersList: any;

  constructor() {
    this._headersList = {
			"Accept": "/",
			"User-Agent": "Quilla Search",
			"Content-Type": "application/json"		
		}
   }

  async post(path: string, content?: any): Promise<any> {		
		return await fetch(this.apiServer + path, { headers: this._headersList, body: JSON.stringify(content), method: 'POST' })
			.then((response) => response.json())
			.catch(error =>{
				// this.spinner.hide();
				SweetAlertMessageHelpers.Error('Error', error);
			});
	}

	async get(path: string): Promise<any> {						
		return await fetch(this.apiServer + path, { headers: this._headersList })
			.then((response) => response.json())
			.catch(error =>{
				// this.spinner.hide();
				SweetAlertMessageHelpers.Error('Error', error);
			});
	}

	async put(path: string, content?: any): Promise<any> {		
		return await fetch(this.apiServer + path, { headers: this._headersList, body: JSON.stringify(content), method: 'PUT' })
			.then((response) => response.json())
			.catch(error =>{
				// this.spinner.hide();
				SweetAlertMessageHelpers.Error('Error', error);
			});
	}

	async delete(path: string): Promise<any> {		
		return await fetch(this.apiServer + path, { headers: this._headersList, method: 'DELETE' })
			.then((response) => response.json())
			.catch(error =>{
				// this.spinner.hide();
				SweetAlertMessageHelpers.Error('Error', error);
			});
	}
}
