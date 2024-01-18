import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SweetAlertMessageHelpers } from '../shared/helpers/sweet-alert-message-herlper';

@Injectable({
  providedIn: 'root'
})
export class IdParamGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const id = route.paramMap.get('id');

    if (!id) {
        SweetAlertMessageHelpers.Error("Error","La ruta no es válida.");
    //   this.router.navigate(['/login/100']); // Redirigir a una página de error
      return false;
    }

    return true;
  }
}
