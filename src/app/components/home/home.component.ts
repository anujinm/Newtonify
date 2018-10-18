import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../services/get-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  equation = 'x^2 - x';
  diff_hidden = true;
  integ_hidden = true;
  calculation_type = 'expand';
  front = '';
  minn = '';
  maxx = '';
  end = '';
  variable = 'x';
  power =   '1';
  api_send = '';
  api_response = '';
  spinner_show = false;
  spinner_size = 10;

  full_preview = 'x^2 - x';

  fun_fact_body = [
    'Newton invented the first reflecting telescope.',
    'He was born in 1642, the same year that Galileo died',
    'Newton was born premature and had little chance of survival.',
    'In 1816, his tooth was sold at an auction for approx $3600.',
    'Newton’s father died three months before his birth.',
    'He once stuck a large needle into his eye socket out of curiosity.',
    'He was a stutterer.',
    'His only contribution while he was a member of parliament in the UK was to request the window to be closed.',
    'Newton wrote more on religion than he did on natural science.\n',
    'He liked to draw.',
  ];
  fun_fact_index = 0;
  fun_fact_size = 10;
  quotes_body = [
    '"To myself I am only a child playing on the beach, while vast oceans of truth lie undiscovered before me."',
    '"If I have ever made any valuable discoveries, it has been owing more to patient attention, than to any other talent."',
    '"Tact is the knack of making a point without making an enemy."',
    '"To every action there is always opposed an equal reaction."',
    '"Truth is ever to be found in simplicity, and not in the multiplicity and confusion of things."',
  ];
  quotes_index = 0;
  quotes_size  = 5;
  constructor(private get_api_service: GetApiService) { }

  ngOnInit() {

  }

  textChanged(event) {
    this.full_preview = this.front +  this.equation + this.end;
  }

  ClearAll() {
    this.api_response  = '';
    this.equation  = '';
    this.diff_hidden = true;
    this.integ_hidden = true;
    this.front = '';
    this.end = '';

  }
  calculate() {
    this.spinner_show = true;
    this.api_response = '';
    console.log('check test..');
    this.api_send = 'http://ec2-18-191-3-13.us-east-2.compute.amazonaws.com:8000/views/?equation=' + this.equation.replace( ' ' , '' )  + '&type=' + this.calculation_type  + '&var=' + this.variable + '&times=' + this.power + '&min=' + this.minn + '&max=' + this.maxx;



    this.get_api_service.get_api(this.api_send).subscribe(res => {
      this.api_response = res['answer'];
      this.spinner_show = false;
    });
  }

  fun_fact_next() {
    this.fun_fact_index = (this.fun_fact_index + 1) % this.fun_fact_size;
  }
  quotes_next() {
    this.quotes_index = (this.quotes_index + 1) % this.quotes_size;
  }

  comboBoxChanged(event) {
    console.log('saffsdf');


    console.log(this.calculation_type);

    if (this.calculation_type === 'diff') {
      this.integ_hidden = true;
      this.diff_hidden = false;
      if (parseInt(this.power, 10) >= 2) {
        this.front = '\\frac{d^{' + this.power + '}}{d' + this.variable + '^{' + this.power + '}}(';
      } else {
        this.front = '\\frac{d}{d' + this.variable + '}(';
      }
      this.end = ')';
    } else if (this.calculation_type === 'integ') {
      this.integ_hidden = false;
      this.diff_hidden = true;
      this.front = '\\int\\limits_{' + this.minn +  '}^{' + this.maxx + '} (';
      this.end = ') d' +  this.variable;
    } else {
      this.diff_hidden = true;
      this.integ_hidden = true;
      this.front  = '';
      this.end  = '';
    }
    this.full_preview = this.front +  this.equation + this.end;
  }

}
