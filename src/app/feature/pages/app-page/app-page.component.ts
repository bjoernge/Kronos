import {Component, OnInit} from '@angular/core';
import {part2} from '../../../questions/questions';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent implements OnInit {

  public questionary = part2;

  constructor() {
  }

  ngOnInit() {
  }

}
