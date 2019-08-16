import { Component, OnInit } from '@angular/core';
import { faAngleDoubleLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  public faAngleDoubleLeft = faAngleDoubleLeft;
  public faSave = faSave;

  constructor() { }

  ngOnInit() {
  }

}
