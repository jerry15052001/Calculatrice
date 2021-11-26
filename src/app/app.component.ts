import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CalculatorApp';

////////////////////////////////////////////////////////////////////////

  constructor() {}
  input: string = '';
  result: string = '';
  recent: boolean = false;
  ngOnInit(): void {
    
  }
  pressNum(num: string) {

    if (this.recent == true) {
      this.input = '';
      this.recent = false;
    }
    //Do Not Allow . more than once
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    if (this.input.toString() == '0') {
      this.input = '';
      this.input = num;
    }
    else{
      this.input = this.input + num;
      this.calcAnswer();
    }
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    this.recent = false;
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      this.clear();
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  clear() {
    if (this.input != '') {
      try {
        this.input = this.input.substr(0, this.input.length - 1);
      } catch (e) {
        this.allClear();
      }
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' || 
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }

    this.result = eval(formula);

    if ((this.result.toString() == 'NaN' )  || (this.result.toString() == 'Infinity') ){
      this.result = 'Math Error';
      
    }  
  }

  getAnswer() {
    try{
      this.calcAnswer();
      this.input = this.result;
    
      if (this.input == '0') {
        this.input = '';
      }

    }
    catch(err){
      
    }
    this.recent = true;
    
  }
}


////////////////////////////////////////////////////////////////////////