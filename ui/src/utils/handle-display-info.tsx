import { Badge } from '@chakra-ui/react';
import { ReactElement } from 'react';

export const handleDocumentType = (type: string): ReactElement => {
  switch (type) {
    case 'P':
      return <Badge colorScheme="green">CPF</Badge>
    case 'C':
      return <Badge colorScheme="purple">CNPJ</Badge>
    default:
      return <Badge>Não definido</Badge>
  }
}

export const handleBlacklist = (blacklist: boolean | undefined): ReactElement => {
  switch (blacklist) {
    case true:
      return <Badge colorScheme="red">SIM</Badge>
    case false:
      return <Badge colorScheme="blue">NÃO</Badge>
    default:
      return <Badge>Não definido</Badge>
  }
}

export const handleDocument = (document: string): string => {
  let i = 0;
  let pattern = '###.###.###-##';
  if (document.length > 11) {
    pattern = '##.###.###/####-##';
  }
  return pattern.replace(/#/g, () => document[i++] || '');
}
