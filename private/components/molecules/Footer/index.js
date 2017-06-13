import {Container, Grid} from 'semantic-ui-react';
import {FooterLink} from 'components/atoms/Link';
import SocialMedia from 'components/molecules/SocialMedia';
import React from 'react';
import {
  FooterDiv,
  BlackContainer,
  TopFooter,
  FooterHeader,
  WhiteContainer,
  FooterDisclaimer
} from '../../atoms/Footer';

/* eslint-disable max-len */
const footer = () => (
  <FooterDiv>
    <BlackContainer>
      <TopFooter>
        <Container>
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column>
                <FooterHeader>First Columns</FooterHeader>
                <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
              </Grid.Column>
              <Grid.Column>
                <FooterHeader>Second Columns</FooterHeader>
                <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
              </Grid.Column>
              <Grid.Column>
                <FooterHeader>Third Columns</FooterHeader>
                <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
              </Grid.Column>
              <Grid.Column>
                <FooterHeader>Fourth Columns</FooterHeader>
                <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 2 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 3 </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Link 4 </FooterLink>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </TopFooter>
    </BlackContainer>
    <WhiteContainer>
      <Grid.Row>
        <Container textAlign="center">
          <Grid.Column width={16}>
            <SocialMedia href="https://twitter.com/devinitorg" type="twitter" />
            <SocialMedia href="https://twitter.com/devinitorg" type="facebook f" />
            <SocialMedia href="https://twitter.com/devinitorg" type="youtube play" />
            <SocialMedia href="https://twitter.com/devinitorg" type="flickr" />
          </Grid.Column>
        </Container>
      </Grid.Row>
    </WhiteContainer>
    <BlackContainer className="lightBlack">
      <Grid.Row>
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
      </Grid.Row>
    </BlackContainer>
  </FooterDiv>
);

export default footer;
