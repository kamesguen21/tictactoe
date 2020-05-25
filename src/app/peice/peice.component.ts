import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-peice',
  templateUrl: './peice.component.html',
  styleUrls: ['./peice.component.css']
})
export class PeiceComponent implements OnInit {
  @Input() value: 'X' | 'O';

  constructor() { }

  ngOnInit(): void {
  }

}
