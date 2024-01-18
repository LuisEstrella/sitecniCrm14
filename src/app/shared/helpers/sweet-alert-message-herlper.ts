import { SweetAlert } from "../enums/sweetalert.enum";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TypeMessage } from "../enums/type-message.enum";


export class SweetAlertMessageHelpers {

    /**
    * @description Success
    * @author Priscy Antonio Reales
    * @param title show title in message window
    * @param text display the message in the pop-up window
    * @returns none
    */
    static Success(title: string, text: string) {
      Swal.fire({
        title,
        text,
        icon: SweetAlert.iconSuccess,
        confirmButtonText: SweetAlert.btnConfirmationText,
        confirmButtonColor: SweetAlert.btnConfirmationColor        
      });
    }
  
    /**
    * @description Info
    * @author Priscy Antonio Reales
    * @param title show title in message window
    * @param text display the message in the pop-up window
    * @returns none
    */
     static Info(title: string, text: string) {
      Swal.fire({
        title,
        text,
        icon: SweetAlert.iconInfo,
        confirmButtonText: SweetAlert.btnConfirmationText,
        confirmButtonColor: SweetAlert.btnConfirmationColor,
      });
    }
  
  
    /**
   * @description Warning
   * @author Priscy Antonio Reales
   * @param title show title in message window
   * @param text display the message in the pop-up window
   * @returns none
   */
    static Warning(title: string, text: string) {
      Swal.fire({
        title,
        html : text,
        icon: SweetAlert.iconWarning,
        confirmButtonText: SweetAlert.btnConfirmationText,
        confirmButtonColor: SweetAlert.btnConfirmationColor,
      });
    }
  
    /**
   * @description Error
   * @author Priscy Antonio Reales
   * @param title show title in message window
   * @param text display the message in the pop-up window
   * @returns none
   */
    static Error(title: string, text: string) {
      Swal.fire({
        title,
        text,
        icon: SweetAlert.iconError,
        confirmButtonText: SweetAlert.btnConfirmationText,
        confirmButtonColor: SweetAlert.btnConfirmationColor,
      });
    }
  
    /**
   * @description Confirm
   * @author Priscy Antonio Reales
   * @param title show title in message window
   * @param text display the message in the pop-up window
   * @returns none
   */
    static Confirm(title: string, text: string, buttonCancel : boolean = true) {
      return Swal.fire({
        title,
        text,
        icon: SweetAlert.iconWarning,
        showCancelButton: buttonCancel,
        confirmButtonColor: SweetAlert.btnConfirmationText,
        cancelButtonColor: SweetAlert.btnCancelColor,
        confirmButtonText: SweetAlert.btnConfirmationText,
        cancelButtonText: SweetAlert.btnCancelText,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }

    /**
   * @description Timer
   * @author Priscy Antonio Reales
   * @param title show title in message window
   * @param text display the message in the pop-up window
   * @returns none
   */
    static Timer(title : string, timer : number = 2000, iconInfo : SweetAlertIcon = SweetAlert.iconInfo,  text? : string ){
        return Swal.fire({
            title,
            text,
            icon : iconInfo,
            timer: timer,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen : ()=>{
                Swal.showLoading();
            }
        });
    }
  
    /**
     * @description Confirm Delete
     * @author Priscy Antonio Reales
     * @param title show title in message window
     * @param text display the message in the pop-up window
     * @returns none
     */
    static ConfirmDelete(title: string, text: string) {
      return Swal.fire({
        title,
        text,
        icon: SweetAlert.iconWarning,
        showCancelButton: true,
        confirmButtonColor: SweetAlert.btnConfirmationText,
        cancelButtonColor: SweetAlert.btnCancelColor,
        confirmButtonText: SweetAlert.btnDeleteText,
        cancelButtonText: SweetAlert.btnCancelText,
      });
    }
  
    /**
     * @description Show Message.
     * @author Priscy Antonio Reales
     * @param typeMessage 1: Success, 2: Warning y 0: Error
     * @sprint 1
     * @returns none
     */
    static ShowMessage(typeMessage: TypeMessage, optionalParameters? : string[]) {
      let titleAlert: string;
      let messageAlert: string;
      switch (typeMessage) {
        case TypeMessage.Success: {
          titleAlert = SweetAlert.titleAlert;
          messageAlert = SweetAlert.messageAlertCreate;
          return SweetAlertMessageHelpers.Success(titleAlert, messageAlert);
        }
        case TypeMessage.Warning: {
          titleAlert = SweetAlert.titleAlert;
          messageAlert = SweetAlert.messageAlertUpdate;
          return SweetAlertMessageHelpers.Warning(titleAlert, messageAlert);
        }
        case TypeMessage.Delete: {
          titleAlert = SweetAlert.titleAlert;
          messageAlert = SweetAlert.messageAlertDelete;
          return SweetAlertMessageHelpers.Info(titleAlert, messageAlert);
        }
        case TypeMessage.Error: {
          titleAlert = SweetAlert.titleAlertError;
          messageAlert = SweetAlert.messageAlertError;
          return SweetAlertMessageHelpers.Error(titleAlert, messageAlert);
        }       
        case TypeMessage.Update: {
          titleAlert = SweetAlert.titleAlert;
          messageAlert = SweetAlert.messageAlertUpdate;
          return SweetAlertMessageHelpers.Success(titleAlert, messageAlert);
        }
      }
    }

    static listWarningMessageShow(tittleMessage: string, listMessage: string[], column? :number, width? : string, subtittleOne?: string) {
      if(!column) column = 1;
      var divStar = `<div style = "overflow-x: auto; height: auto;">`
      var divEnd = `<div>`
      var ulStart = `<ul style=" column-count: ${column}">`;
      var ulEnd = '</ul>';
      let htmlMessage : string = '';
      let firstSubtittle : string = '';
      if(subtittleOne) firstSubtittle = `<ul class="text-justify"><h5><strong>${subtittleOne}</strong></h6>${ulEnd}`;
      htmlMessage += firstSubtittle;
      let msnError = `${divStar} ${ulStart} ${listMessage.map((v) => {return `<li style="text-align: justify">${v}</li>`;})} ${ulEnd} ${divEnd}`;
      msnError = msnError.replace(/li>,/g,'li>');
      htmlMessage += msnError;

      Swal.fire({
        title: tittleMessage,
        html: htmlMessage,
        icon: SweetAlert.iconError,
        confirmButtonText: SweetAlert.btnConfirmationText,
        confirmButtonColor: SweetAlert.btnConfirmationColor,
        width : width
      });
    }

    static listMessageShow(tittleMessage: string, listMessageOne: string[], subtittleOne?: string, subtittleTwo?: string, listMessageTwo?: string[], column?: number, width? : string){
      if(!column) column = 1;
      var ulStartSimple = `<ul>`;
      var ulEnd = '</ul>';
      var htmlMessage = [];
      let firstSubtittle : string = '';
      if(subtittleOne) firstSubtittle = `${ulStartSimple}<h4><strong>${subtittleOne}</strong></h4>${ulEnd}`;
      let msnErrorOne = `${ulStartSimple} ${listMessageOne.map((v) => {return `<li style="list-style: none" class="text-justify"><strong>${v}</strong></li>`;})} ${ulEnd}`;
      msnErrorOne = msnErrorOne.replace(/li>,/g,'li>');

      let secondSubtittle : string = '';
      if(subtittleTwo) secondSubtittle = `${ulStartSimple}<h4><strong>${subtittleTwo}</strong></h4>${ulEnd}`;
      var ulStart = `<ul style="column-count: ${column}">`;
      let msnErrorTwo : string = '';
      if(listMessageTwo){
        msnErrorTwo = `${ulStart} ${listMessageTwo.map((v) => {return `<li style="list-style: none" class="text-justify"><strong>${v}</strong></li>`;})} ${ulEnd}`;
        msnErrorTwo = msnErrorTwo.replace(/li>,/g,'li>');
      }
        
      const html = `${firstSubtittle}${msnErrorOne}${secondSubtittle}${msnErrorTwo}`;

      Swal.fire({
        title: tittleMessage,
        html: html,
        icon: SweetAlert.iconError,
        confirmButtonText: SweetAlert.btnConfirmationText,
        confirmButtonColor: SweetAlert.btnConfirmationColor,
        width : width
      });
    }
  }