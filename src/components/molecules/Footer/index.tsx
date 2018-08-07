import { Container, Grid } from 'semantic-ui-react';
import { FooterLink } from '../../atoms/Link';
import SocialMedia from '../SocialMedia';
import * as React from 'react';
import {
  BlackContainer,
  FooterDisclaimer,
  FooterDiv,
  FooterHeader,
  TopFooter,
  WhiteContainer
} from '../../atoms/Footer';

/* eslint-disable max-len */
const footer = () =>
  (<FooterDiv>
    <BlackContainer>
      <TopFooter>
        <Container>
          <Grid>
            <Grid.Row columns={ 4 }>
              <Grid.Column mobile={ 16 } computer={ 4 } tablet={ 8 }>
                <FooterHeader>Sections</FooterHeader>
                <FooterLink href="http://devinit.org/data-blog"> Data blog </FooterLink>
                <FooterLink href="http://devinit.org/publications"> Publications</FooterLink>
                <FooterLink href="http://devinit.org/events"> Events</FooterLink>
                <FooterLink href="http://devinit.org/working-with-us"> Working with us </FooterLink>
              </Grid.Column>
              <Grid.Column mobile={ 16 } computer={ 4 } tablet={ 8 }>
                <FooterHeader>Quick Links</FooterHeader>
                <FooterLink href="http://devinit.org/about/contact-us/"> Contact us </FooterLink>
                <FooterLink href="http://devinit.org/topics"> Topics</FooterLink>
                <FooterLink href="http://devinit.org/about/consultancy">
                  { ' ' }Our consultancy services{ ' ' }
                </FooterLink>
                <FooterLink href="http://devinit.org/about/open-di-publishing-to-iati">
                  { ' ' }Open DI - publishing to IATI{ ' ' }
                </FooterLink>
              </Grid.Column>
              <Grid.Column mobile={ 16 } computer={ 4 } tablet={ 8 }>
                <FooterHeader>Newsletter</FooterHeader>
                <p>
                  Sign up for the{ ' ' }
                  <a href="http://devinit.org/about/newsletter-sign-up">
                    Development Initiatives newsletter
                  </a>{ ' ' }
                  to receive regular news and updates from DI.
                </p>
              </Grid.Column>
              <Grid.Column mobile={ 16 } computer={ 4 } tablet={ 8 }>
                <FooterHeader>Creative Commons</FooterHeader>
                <p>
                  This sites content is licensed under a{ ' ' }
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                    { ' ' }Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
                    license.
                  </a>
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
          <Grid.Column width={ 16 }>
            <SocialMedia href="https://twitter.com/devinitorg" type="twitter" />
            <SocialMedia
              href="https://www.facebook.com/Development.Initiatives"
              type="facebook f"
            />
            <SocialMedia href="https://www.youtube.com/user/devinitorg" type="youtube play" />
            <SocialMedia
              href="https://www.flickr.com/people/development_initiatives/"
              type="flickr"
            />
          </Grid.Column>
        </Container>
      </Grid.Row>
    </WhiteContainer>
    <BlackContainer className="lightBlack">
      <Grid.Row>
        <Container>
          <FooterDisclaimer>
            <p>
              © Development Initiatives 2018. Development Initiatives is the trading name of
              Development Initiatives Poverty Research Ltd, registered in England and Wales,
              Company No. 06368740;
              <br/>
              DI International Ltd, registered in England and Wales,
              Company No. 5802543, Registered Address: North Quay House, Quay Side, Temple Back,
              Bristol, BS1 6FL, UK; and Development Initiatives Poverty Research America Inc.
              (a 501(C)3 company registered in the state of Delaware with the registration number 5737757),
              Registered Address: 1209 Orange Street, Wilmington, New Castle County, Delaware 19801.
              Read our { ' ' }
              <a href="http://devinit.org/wp-content/uploads/2017/01/privacy_and_data_policy.pdf">
                privacy policy
              </a>.
              <a href="http://devinit.org/wp-content/uploads/2018/07/Modern-slavery-and-human-trafficking-statement.pdf" target="_blank">
                { ' ' } View our Modern slavery and human trafficking statement.
              </a>
            </p>
          </FooterDisclaimer>
        </Container>
      </Grid.Row>
    </BlackContainer>
  </FooterDiv>);

export default footer;
