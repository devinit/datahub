import * as React from 'react';
import { Div, Span, H4, Img, P} from 'glamorous';
import { Container, Grid, Icon, Dropdown } from 'semantic-ui-react';
import { red } from '../../theme/semantic';
import { Lead } from '../../atoms/Header';
import { BodyLink } from '../../atoms/Link';
import {Props as MapProps} from '../SmallMap';
import ProfileSocialMedia from '../ProfileSocialMedia';
import {Country, District} from '@devinit/dh-base/lib/types';
import { CardContainer, ProfileHeader } from '../../atoms/Container';
import {CurrencyOption} from '@devinit/dh-base/lib/utils';
import {DONOR, GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS} from '@devinit/dh-base/lib/utils/constants';
import dynamic, {DynamicOptions} from 'next/dynamic';

const dynamicOpts: DynamicOptions<MapProps, MapProps> = {
    ssr: false,
    loading: () => (<p>Loading...</p>),
    modules: () => ({
        SmallMap: import('../SmallMap') as Promise<any>
    }),
    render: (props, {SmallMap}) =>
      <div>
        <SmallMap {...props} />
      </div>
};

const DynamicMapComponent = dynamic(dynamicOpts as any);

export interface CProps  {
  visible: boolean;
  profile: boolean;
  country?: string; // for regional profile
  placeholder?: string;
}

export interface Props  {
  entity: Country | District; // country or district
  jumpToSection?: (sectionId: string) => void;
  currency?: string;
  currencyOptions?: CurrencyOption[];
  onChangeCurrency ?: (currency: string) => void;
  spotlightCountry?: Country;
  countrySearch: React.StatelessComponent<CProps>;
}

const ProfileHeaderSection = (props: Props) => {
  const CountrySearch = props.countrySearch;
  const jumpToSection = (section: string) => () =>
    props.jumpToSection && props.jumpToSection(section);
  return (
    <ProfileHeader>
      {process.env.NODE_ENV !== 'test' ?
        <DynamicMapComponent
          slug={props.entity.slug || ''}
          spotlightCountry={props.spotlightCountry && props.spotlightCountry.slug}
        /> : ''
      }
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
                        <a>
                          href={`/spotlight-on-${props.spotlightCountry.slug}`}
                          role="link" style={{color: red}}>
                          Spotlight on {props.spotlightCountry.name}
                        </a>
                       :
                        <a href="/" role="link" style={{color: red}}>Global Picture</a>
                    }
                  </H4>
                  {
                    props.spotlightCountry ?
                      <CountrySearch
                        visible
                        placeholder={props.entity.name}
                        profile
                        country={props.spotlightCountry.slug}
                      />
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
                        {(props.entity as Country).countryType !== DONOR ?
                          `Explore this in-depth profile of ${props.entity.name} to find out overall levels of poverty,
                        income distribution, division of wealth and more. Discover how national and
                        sub-national revenue is generated.` :
                          // tslint:disable-next-line:max-line-length
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
                        (props.entity as Country).countryType !== DONOR ?
                          <span>
                            <BodyLink
                              onClick={jumpToSection(GOVERNMENT_FINANCE_LOWER)}
                              color={red}
                            >government finance
                            </BodyLink> or </span> : ''
                      }
                      <BodyLink
                        color={red}
                        onClick={jumpToSection(INFLOWS_VS_OUTFLOWS)}
                      >international resources
                      </BodyLink>
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
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={(_e, data) =>
                            props.onChangeCurrency && data.value && props.onChangeCurrency(data.value.toString())
                          }
                        />
                      </article>
                      : ''
                  }
                  {(process as any).browser ?
                    <ProfileSocialMedia
                      isCountryProfile={!props.spotlightCountry}
                      entity={props.entity}
                    />
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
