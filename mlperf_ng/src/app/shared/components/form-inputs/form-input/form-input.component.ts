import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from '../input-base';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() input!: InputBase<any>;

    constructor() {}

    ngOnInit(): void {}
}
