import { Injectable } from "@angular/core";
import { ToastrService, ActiveToast } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class MessageService {

  constructor(private toastr: ToastrService) { }

  public showSuccessMessage(text: string): ActiveToast<any> {
    return this.toastr.success(text);
  }

  public showErrorMessage(error: string | HttpErrorResponse): ActiveToast<any> {
    if (error instanceof HttpErrorResponse) {
      console.log(error);
      return this.toastr.error(error.statusText);
    } else {
      return this.toastr.error(error);
    }
  }

  public showInfoMessage(text: string): ActiveToast<any> {
    return this.toastr.info(text);
  }

  public showWarningMessage(text: string): ActiveToast<any> {
    return this.toastr.warning(text);
  }
}
