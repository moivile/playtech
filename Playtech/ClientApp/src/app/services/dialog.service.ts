import { Injectable, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Injectable()
export class DialogService extends MatDialog {
  public confirm(question: string, action: string = "", description: string = ""): EventEmitter<{}> {
    const dialogRef = this.open(ConfirmationDialogComponent, {
      width: "400px",
      data: { question, action, description }
    });
    return dialogRef.componentInstance.onOk;
  }
}
