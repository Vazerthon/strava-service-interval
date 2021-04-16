import styled from '@emotion/styled/macro';

const Example = styled.div`
  width: ${({ theme }) => theme.spacing.units(10)};
  height: ${({ theme }) => theme.spacing.units(10)};
  background-color: ${({ theme }) => theme.colour.primary};
`;

export default Example;