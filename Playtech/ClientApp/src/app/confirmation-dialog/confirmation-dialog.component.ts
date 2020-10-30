import { Component, OnInit, Inject, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ConfirmationDialogData } from "../models/confirmation-dialog-data";


@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"]
})
export class ConfirmationDialogComponent implements OnInit {

  public onOk: EventEmitter<{}> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }

  public ngOnInit() {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onOkClick(): void {
    this.dialogRef.close();
    this.onOk.emit();
  }

}
