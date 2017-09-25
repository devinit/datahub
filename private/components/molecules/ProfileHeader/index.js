// @flow
import React from 'react';
import { Div, Span, H4, Img, P} from 'glamorous';
import { Container, Grid, Icon, Button, Dropdown } from 'semantic-ui-react';
import { red } from 'components/theme/semantic';
import { Lead } from 'components/atoms/Header';
import { BodyLink } from 'components/atoms/Link';
import CountrySearch from 'components/organisms/CountrySearchInput';
import { CardContainer, ProfileHeader } from 'components/atoms/Container';
import Link from 'next/link';
import type {CurrencyOption} from 'lib/utils';
import {DONOR, GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS} from 'lib/utils/constants';
import dynamic from 'next/dynamic';
/* eslint-disable react/no-danger */
/* eslint-disable max-len */


const DynamicMapComponent = dynamic(
  import('components/molecules/SmallMap'), {
    ssr: false,
    loading: () => (<p>Loading...</p>)
  });

type Props = {
  entity: Country | District, // country or district
  jumpToSection?: (sectionId: string) => void,
  currency?: string,
  currencyOptions?: CurrencyOption[],
  onChangeCurrency ?: (currency: string) => void,
  spotlightCountry?: Country
};

const ProfileHeaderSection = (props: Props) => {
  return (
    <ProfileHeader>
      <DynamicMapComponent
        slug={props.entity.slug}
        spotlightCountry={props.spotlightCountry && props.spotlightCountry.slug}
      />
      <Div width="100%" position="absolute" top="0">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column computer={12} tablet={16} mobile={16}>
                <CardContainer>
                  <H4 color={red}>
                    <Icon name="globe" color={'red'} />
                    {
                      props.spotlightCountry ?
                        <Link href="/">
                          <a role="link" style={{color: red}}>Spotlight on uganda</a>
                        </Link> :
                        <Link href="/spotlight-on-uganda">
                          <a role="link" style={{color: red}}>Global Picture</a>
                        </Link>
                    }
                  </H4>
                  {
                    props.spotlightCountry ?
                      <CountrySearch visible placeholder={props.entity.name} profile country={props.spotlightCountry.slug} />
                      :
                      <CountrySearch visible placeholder={props.entity.name} profile />
                  }
                  {
                    props.spotlightCountry ?
                      <Lead>
                        Explore this in-depth profile to find out about poverty, population, education, health, water,
                        sanitation and hygiene, and district public resources in {props.entity.name}.
                        <Span fontWeight={500} lineHeight="3" fontSize="0.7em" display="block">
                            Visit the {' '}
                          <BodyLink href={`/country/${props.spotlightCountry.slug}`}>
                            {props.spotlightCountry.name} country Profile
                          </BodyLink>
                          {' '}to explore national-level data.
                        </Span>
                      </Lead> :
                      <Lead>
                        {props.entity.countryType !== DONOR ?
                          `Explore this in-depth profile of ${props.entity.name} to find out overall levels of poverty,
                        income distribution, division of wealth and more. Discover how national and
                        sub-national revenue is generated.` :
                          `Explore this in-depth profile of ${props.entity.name} to see the international resources it directs to developing countries.
                        Get an overview of government spending, population and income distribution.`
                        }
                        <Img marginLeft="10px" width="32px" src={`/flags/svg/${props.entity.id}.svg`} />
                        {props.entity.slug === 'uganda' ?
                          <Span fontSize="0.7em" display={'block'} fontWeight={500} >
                          Visit our new <BodyLink href="/spotlight-on-uganda">
                            Spotlight on Uganda</BodyLink> to explore data by district.</Span> : ''
                        }
                      </Lead>
                  }
                  {props.jumpToSection ?
                    <Span>
                      Jump to {
                        props.entity.countryType !== DONOR ?
                          <span>
                            <BodyLink
                              onClick={() => props.jumpToSection && props.jumpToSection(GOVERNMENT_FINANCE_LOWER)}
                              color={red}
                            >government finance </BodyLink> or </span> : ''
                      }
                      <BodyLink
                        color={red}
                        onClick={() => props.jumpToSection && props.jumpToSection(INFLOWS_VS_OUTFLOWS)}
                      >international resources</BodyLink>
                    </Span> : ''
                  }
                  {
                    props.spotlightCountry ?
                      <article>
                        <P fontWeight={500} fontSize="1.2em" lineHeight="0">View all financial data in: </P>
                        <Dropdown
                          compact
                          selection
                          value={props.currency}
                          options={props.currencyOptions}
                          onChange={(e, data) => props.onChangeCurrency && props.onChangeCurrency(data.value)}
                        />
                      </article>
                      : ''
                  }
                  {process.browser ?
                    <Div marginTop={'1.5em'}>
                      <a href={`http://www.facebook.com/share.php?u=${window.location.href}`}>
                        <Button icon="facebook f" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"`}
                      >
                        <Button icon="twitter" />
                      </a>
                      <a href={`https://plus.google.com/share?url=${window.location.href}`}>
                        <Button icon="google plus" />
                      </a>
                      <a
                        href={`mailto:?subject=Development Initiatives: Uganda&body=Development Initiatives: Uganda — ${window.location.href}`}
                      >
                        <Button icon="mail outline" />
                      </a>
                      {!props.spotlightCountry ?
                        <a
                          rel="noopener"
                          href={`/pdf/20170331/${props.entity.name}.pdf`}
                          target="__blank"
                        >
                          <Button size="medium"><Span fontWeight={500}>Download and Print</Span></Button>
                        </a> : '' }

                    </Div>
                    : ''
                  }
                </CardContainer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Div>
    </ProfileHeader>);
};

export default ProfileHeaderSection;
