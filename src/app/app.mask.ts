import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export class MASKS {
    static phoneMask: Array<{}> = ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    static rgMask: Array<{}> = [ /\d/ , /\d/ , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
    static cpfMask: Array<{}> = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/];
    static cnpjMask: Array<{}> = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/];
    static cepMask: Array<{}> = [/\d/ , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    static dataMask: Array<{}> = [/\d/ , /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    static valorMask: Array<{}> = createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        decimalSymbol : ',',
        allowDecimal: false,
        requireDecimal: true,
      });
}