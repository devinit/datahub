// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import theme from 'components/theme';
import {SocialMediaLink} from 'components/atoms/Link';

type Props = {
  countries: [string],
  placeholder: string,
  visible: boolean
};

const InputContainer = glamorous.div({
  width: '100%',
  backgroundColor: theme.white,
  height: '0em',
  overflow: 'hidden',
  transition: 'all .3s ease-in-out',
},
  (props) => ({
    height: props.visible ? '10em' : '0em'
  }));
const Input = glamorous.input({
  height: '80px',
  width: '100%',
  marginTop: '1.2em',
  fontSize: theme.big,
  fontWeight: '700',
  paddingLeft: '1.5em',
  backgroundColor: 'transparent',
  border: 'none',
  transition: 'all .2s ease-in-out',
  ':focus': {
    outline: 'none',
    paddingLeft: '1.7em',
    backgroundColor: theme.plainWhite,
    boxShadow: `inset 0 0.125em 0.063em ${theme.shadow}`,
  },
});

const SearchInput = ({countries, placeholder, visible}: Props) => (
  <InputContainer
    visible={visible}
  >
    <Container>
      <Input
        placeholder={placeholder}
      />
    </Container>
  </InputContainer>
);
export default SearchInput;
