import { validateDocument } from '../utils/document-validator';

describe('Document validator tests', () => {

  it('should return isValid = false if no document is provided', () => {
    const validation = validateDocument('');
    expect(validation.isValid).toBeFalsy();
  });

  it('should return isValid = false if an invalid document is provided', () => {
    const validation = validateDocument('1234567890');
    expect(validation.isValid).toBeFalsy();
  });

  it('should return isValid = true and type = P if a valid CPF is provided', () => {
    const validation = validateDocument('84251032071');
    expect(validation.isValid).toBeTruthy();
    expect(validation.type).toBe('P');
  });

  it('should return isValid = true and type = C if a valid CNPJ is provided', () => {
    const validation = validateDocument('73025199000186');
    expect(validation.isValid).toBeTruthy();
    expect(validation.type).toBe('C');
  });

});
