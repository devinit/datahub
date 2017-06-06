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
  transition: 'all .3s ease-in-out',
  '& .list': {
    display: 'none',
  },
  '& input:focus + .list': {
    display: 'block',
  }
},
  (props) => ({
    height: props.visible ? '10em' : '0em',
    overflow: props.visible ? 'visible' : 'hidden'
  }));
const List = glamorous.ul({
  borderRadius: '.125em',
  boxShadow: '0 .125em .125em 0 rgba(0,0,0,.2)',
  listStyleType: 'none',
  position: 'absolute',
  top: '-1.23em',
  width: '100%',
  paddingLeft: '0px',
  backgroundColor: theme.plainWhite,
  '& li': {
    padding: '1em',
    fontWeight: '700',
    cursor: 'pointer',
  },
  '& li:hover': {
    backgroundColor: theme.white,
  }
});
const Wrapper = glamorous.div({
  position: 'relative',
});
const Input = glamorous.input({
  height: '3.2em',
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
    borderRadius: '.125em',
    boxShadow: '0 .125em .125em 0 rgba(0,0,0,.2)',
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
      <Wrapper
        className="list"
      >
        <List >
          <li>Item1</li>
          <li>Item2</li>
        </List>
      </Wrapper>
    </Container>
  </InputContainer>
);
export default SearchInput;
