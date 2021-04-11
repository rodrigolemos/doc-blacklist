export const validateDocument = (strDocument: string): { type: string, isValid: boolean } => {
  if (strDocument.length > 11) {
    return {
      type: 'C',
      isValid: validateCNPJ(strDocument)
    };
  }
  return {
    type: 'P',
    isValid: validateCPF(strDocument)
  };
}

const validateCNPJ = (strCNPJ: string): boolean => {
  if (!strCNPJ) {
    return false;
  }

  const validTypes = typeof strCNPJ === 'string' || Number.isInteger(strCNPJ) || Array.isArray(strCNPJ);

  if (!validTypes) {
    return false;
  }

  const match = strCNPJ.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) {
    return false;
  }
  
  const items = [...new Set(numbers)];
  if (items.length === 1) {
    return false;
  }

  const calc = (x: number) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) {
        factor = 9;
      }
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  }

  const digits = numbers.slice(12);
  
  const digit0 = calc(12);

  if (digit0 !== digits[0]) {
    return false;
  }

  const digit1 = calc(13);

  return (digit1 === digits[1])
}

const validateCPF = (strCPF: string): boolean => {
  
  let sum = 0;
  let rest;

  // Check if all characters are the same
  if (strCPF.split('').every(char => char === strCPF.substr(0, 1))) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }
  
  if (rest !== parseInt(strCPF.substring(9, 10)) ) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }
  
  if (rest !== parseInt(strCPF.substring(10, 11) ) ) {
    return false;
  }

  return true;
}
