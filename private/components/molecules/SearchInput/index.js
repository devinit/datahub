// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import {SocialMediaLink} from 'components/atoms/Link';
import {Input, InputContainer} from '../../atoms/SearchInput/input';
import {List} from '../../atoms/SearchInput/list';

type Props = {
  countries: [string],
  placeholder: string,
  visible: boolean
};

const Wrapper = glamorous.div({
  position: 'relative',
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
