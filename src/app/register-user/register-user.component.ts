import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../shared/models/user.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SweetAlertMessageHelpers } from '../shared/helpers/sweet-alert-message-herlper';
import { UserService } from '../shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public formRegisterUser!: FormGroup;
  public guid: string = '';
  public showForm = false;

  private readonly fb: FormBuilder;
  private readonly userService: UserService;
  private readonly spinner: NgxSpinnerService;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    userService : UserService,
    spinner: NgxSpinnerService
  ) { 
    this.fb = fb;
    this.userService = userService;
    this.spinner = spinner;
  }

  ngOnInit(): void {
    this.initForm();
    this.getGuid();
    this.getDataUser();
    this.validateEmailSpinner();
  }

  validateEmailSpinner(){
    // SweetAlertMessageHelpers.Info("Autenticando correo", this.email?.value);
    this.spinner.show('Authenticating')
    setTimeout(() => {
      this.spinner.hide('Authenticating');
      this.showForm = true;
    }, 10000)
  }

  getGuid(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.guid = params.get('id') ?? '';
      if(!this.guid) SweetAlertMessageHelpers.Warning("Advertencia","Ha ocurrido un error.");
    });
  }

  getDataUser(){
    this.spinner.show();
    this.userService.getCustomer(this.guid).then(response => {
      if(response.succeeded){
        this.email?.setValue(response.data.email);
        this.identifcationNumber?.setValue(response.data.id);
        this.spinner.hide();
      }else {
        SweetAlertMessageHelpers.Warning("Advertencia","Ha ocurrido un error.");
        this.spinner.hide();
      }
    });

  }


  sendValidate(){
    if(this.formRegisterUser.valid){
      this.spinner.show();
      const userModel: UserModel = new UserModel(
        this.identifcationNumber?.value,
        this.email?.value,
        this.guid,
        this.name?.value,
        this.lastName?.value,
        this.cellPhone?.value,
        this.address?.value
      );
      this.userService.putCustomer(userModel).then(response =>{
        this.spinner.hide();
        if(response.succeeded){
          SweetAlertMessageHelpers.Success("Hecho",response.message);
          this.router.navigate(['']);
        }else{
          if(response.message)
            SweetAlertMessageHelpers.Error("Error", response.message);
          else
            SweetAlertMessageHelpers.listWarningMessageShow("Error", response.messages);
        }
      });
    }else {
      SweetAlertMessageHelpers.Warning("Advertencia","Ha ocurrido un error. Por favor, llenar los datos faltantes.");
    }
  }


  initForm(){
    this.formRegisterUser = this.fb.group({
      identifcationNumber: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      name: [{value: '', disabled: false}, Validators.required],
      lastName: [{value: '', disabled: false}, Validators.required],
      cellPhone: [{value: '', disabled: false}, Validators.required],
      address: [{value: '', disabled: false}, Validators.required],
    });
  }

  get identifcationNumber() {return this.formRegisterUser.get('identifcationNumber')}
  get email() {return this.formRegisterUser.get('email')}
  get name() {return this.formRegisterUser.get('name')}
  get lastName() {return this.formRegisterUser.get('lastName')}
  get cellPhone() {return this.formRegisterUser.get('cellPhone')}
  get address() {return this.formRegisterUser.get('address')}
}
