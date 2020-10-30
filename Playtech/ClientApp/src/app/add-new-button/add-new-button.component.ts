import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-add-new-button",
  templateUrl: "./add-new-button.component.html",
  styleUrls: ["./add-new-button.component.css"]
})
export class AddNewButtonComponent implements OnInit {

  @Output()
  public click: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  public ngOnInit() {
  }
}
