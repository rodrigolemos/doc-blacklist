export const validateCPF = (strCPF: string): boolean => {
  
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

  if ((rest == 10) || (rest == 11)) {
    rest = 0;
  }
  
  if (rest != parseInt(strCPF.substring(9, 10)) ) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  
  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) {
    rest = 0;
  }
  
  if (rest != parseInt(strCPF.substring(10, 11) ) ) {
    return false;
  }

  return true;
}
