import {Component, Input, OnInit} from '@angular/core';
import { IconSize, IconColor, IconBackground, IconAlign } from '@models/app/icon.model';


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() name: string = '';
  @Input() size: IconSize | null = 'icon';
  @Input() color: IconColor | null = null;
  @Input() background: IconBackground | null = null;
  @Input() align: IconAlign = 'align-middle';
  @Input() disabled: boolean = false;
  @Input() class: string = '';
  @Input() title: string = '';


  constructor() {
  }

  ngOnInit(): void {
  }

}
