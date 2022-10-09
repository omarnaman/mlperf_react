import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-generator-form',
  templateUrl: './load-generator-form.component.html',
  styleUrls: ['./load-generator-form.component.css']
})
export class LoadGeneratorFormComponent implements OnInit {
  q = {
    username: '',
    email: '',
    gender: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
