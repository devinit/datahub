import glamorous from 'glamorous';
import theme from 'components/theme';
import { Container, Grid } from 'semantic-ui-react';
import { FooterLink } from 'components/atoms/Link';
import SocialMedia from 'components/molecules/SocialMedia';
import React from 'react';

const FooterDiv = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.red,
  padding: 16
});

const FooterDisclaimer = glamorous.div({
  padding: 4
});

const BlackContainer = glamorous.div({
  display: 'flex',
  backgroundColor: theme.black,
});

const FooterHeader = glamorous.h4({
  display: 'inline-block'
});
/* eslint-disable max-len */
const footer = () => (
  <FooterDiv>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <FooterHeader>First Columns</FooterHeader>
            <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
          </Grid.Column>
          <Grid.Column width={4}>
            <FooterHeader>Second Columns</FooterHeader>
            <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
          </Grid.Column>
          <Grid.Column width={4}>
            <FooterHeader>Third Columns</FooterHeader>
            <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
          </Grid.Column>
          <Grid.Column width={4}>
            <FooterHeader>Fourth Columns</FooterHeader>
            <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
            <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <SocialMedia href="https://twitter.com/devinitorg" type="twitter" />
            <SocialMedia href="https://twitter.com/devinitorg" type="facebook" />
            <SocialMedia href="https://twitter.com/devinitorg" type="youtube" />
            <SocialMedia href="https://twitter.com/devinitorg" type="flickr" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <BlackContainer className="lightBlack">
              <Container>
                <FooterDisclaimer>
                  <p>
                    © Development Initiatives 2017. Development Initiatives is the trading name of DI International Ltd.
                    Registered in England and Wales No. 05802543. Development Initiatives Poverty Research is the not-for-profit partner of DI
                    International Ltd. Registered in England and Wales No. 06368740. Read our
                    <a href="http://devinit.org/wp-content/uploads/2017/01/privacy_and_data_policy.pdf">
                      privacy
                      policy
                    </a>.
                  </p>
                </FooterDisclaimer>
              </Container>
            </BlackContainer>
          </Grid.Column>
        </Grid.Row>

      </Grid>

    </Container>
  </FooterDiv>
);

export default footer;
