import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertMessageHelpers } from '../shared/helpers/sweet-alert-message-herlper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formUser!: FormGroup;
  public guid : string = '';

  private readonly router: Router;
  private readonly fb: FormBuilder;
  private readonly userService: UserService;
  private readonly spinner: NgxSpinnerService;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    router: Router,
    fb: FormBuilder,
    userService : UserService,
    spinner: NgxSpinnerService
  ) { 
    this.router = router;
    this.fb = fb;
    this.userService = userService;
    this.spinner = spinner;
  }

  ngOnInit(): void {
    this.initForm();
    this.getGuid();
  }

  getGuid(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.guid = params.get('id') ?? '';
    });
  }

   sendValidate(){
     if(this.formUser.valid){
      this.spinner.show();
      const userModel: UserModel = new UserModel(
        this.identifcationNumber?.value,
        this.email?.value,
        this.guid,
      );
      // Logica para las 2 deciciones, si el cliente existe y si no
      this.userService.postCustomer(userModel).then(response => {
        this.spinner.hide();
        if(response.succeeded){
          if(response.message)
          SweetAlertMessageHelpers.Success("Hecho",response.message);
        else
          SweetAlertMessageHelpers.Success(response.messages[0], response.messages[1]);
          // this.router.navigate([''], {queryParams: {messageEnum: 3}}); // Redirigir a una página de error
          this.router.navigate(['']); // Redirigir a una página de error 
        }else {
          if(response.message)
            SweetAlertMessageHelpers.Error("Error", response.message);
          else
            SweetAlertMessageHelpers.listWarningMessageShow("Error", response.messages);
          // SweetAlertMessageHelpers.Warning("¡Advertencia!", response.message);
        }
      });
    }else {
      SweetAlertMessageHelpers.Warning("¡Advertencia!","Ha ocurrido un error. Por favor, llenar los datos faltantes.");
    }
  }

  initForm(){
    this.formUser = this.fb.group({
      identifcationNumber: [{value: '', disabled: false}, Validators.required],
      email: [{value: '', disabled: false}, Validators.required],
    });
  }

  get identifcationNumber() {return this.formUser.get('identifcationNumber')}
  get email() {return this.formUser.get('email')}

}
