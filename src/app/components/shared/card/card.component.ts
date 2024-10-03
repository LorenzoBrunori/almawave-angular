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
  //#endregion

  //#region Private Properties
  //#endregion
  constructor() {}

  //#region Public Methods
  ngOnInit(): void {}

  //#endregion

  //#region Private Methods
  //#endregion
}
