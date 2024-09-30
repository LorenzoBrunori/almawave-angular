import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '@models/app/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports : [NgIf]
})
export class CardComponent implements OnInit {
  //#region Public Properties
  @Input() public card: Partial<Card> = {} as Partial<Card>;
  @Output() public onClick = new EventEmitter();
  //#endregion

  //#region Private Properties
  //#endregion
  constructor() {}

  //#region Public Methods
  ngOnInit(): void {}

  public onClickEvent() : void {
    this.onClick.emit(this.card.link);
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
