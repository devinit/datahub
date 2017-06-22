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
              <Grid.Column mobile={16} computer={4} tablet={8}>
                <FooterHeader>Sections</FooterHeader>
                <FooterLink href="http://devinit.org/#!/blog"> Data blog </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Publications</FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Events</FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Working with us </FooterLink>
              </Grid.Column>
              <Grid.Column mobile={16} computer={4} tablet={8}>
                <FooterHeader>Quick Links</FooterHeader>
                <FooterLink href="http://devinit.org/#!/blog"> Contact us </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Topics</FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Our consultancy services </FooterLink>
                <FooterLink href="http://devinit.org/#!/blog"> Open DI - publishing to IATI </FooterLink>
              </Grid.Column>
              <Grid.Column mobile={16} computer={4} tablet={8}>
                <FooterHeader>Newsletter</FooterHeader>
                <p>
                  Sign up for the Development Initiatives newsletter to receive regular news and updates from DI.
                </p>
              </Grid.Column>
              <Grid.Column mobile={16} computer={4} tablet={8}>
                <FooterHeader>Creative Commons</FooterHeader>
                <p>
                  This sites content is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license .
                </p>
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
