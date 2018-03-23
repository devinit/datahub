import * as React from 'react';
import glamorous, { Span, H4, Img, P} from 'glamorous';
import { Icon, Dropdown } from 'semantic-ui-react';
import { red } from '../../theme/semantic';
import { Lead } from '../../atoms/Header';
import { BodyLink } from '../../atoms/Link';
import ProfileSocialMedia from '../ProfileSocialMedia';
import {ProfileSearch} from '../SearchInput';
import {Country, District} from '../../types';
import { CardContainer, ProfileHeader } from '../../atoms/Container';
import {CurrencyOption} from '../../../utils';
// import {SmallMapProps} from '../Maps';
import {SingletonRouter} from 'next/router';
import {mediaQueries} from '../../theme';
import {LinkState} from 'next/link';
import {DONOR, GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS} from '../../../utils/constants';
import dynamic, {DynamicOptions} from 'next/dynamic';
import {getProfilePageData, getDistrictProfilePageData} from '../../pageData';

const dynamicOpts: DynamicOptions<any, any> = {
    ssr: false,
    loading: () => (<p>Loading...</p>),
    modules: () => ({
        SmallMap: import('../Maps/SmallMap') as Promise<any>
    }),
    render: (props, {SmallMap}) => <SmallMap {...props} />
};
const ProfileContent = glamorous.div({
  width: '60%',
  marginLeft: '11%',
  position: 'absolute',
  top: 0,
  [mediaQueries.tabs]: {
    width: '100%',
    marginLeft: '0%',
  },
});
// SmallMapProps type should be used here, but react / next/dynamic issues wont let it happen
const DynamicMapComponent = dynamic(dynamicOpts as any) as React.StatelessComponent<any>;

export interface Props  {
  router?: SingletonRouter;
  nextLink?: React.ComponentClass<LinkState>;
  entity: Country | District; // country or district
  jumpToSection?: (sectionId: string) => void;
  currency?: string;
  currencyOptions?: CurrencyOption[];
  onChangeCurrency ?: (currency: string) => void;
  spotlightCountry?: Country;
}

const ProfileHeaderSection = (props: Props) => {
  const jumpToSection = (section: string) => () =>
    props.jumpToSection && props.jumpToSection(section);
  return (
    <ProfileHeader>
      {process.env.NODE_ENV !== 'test' && (process as any).browser ?
        <DynamicMapComponent
          slug={props.entity.slug || ''}
          spotlightCountry={props.spotlightCountry && props.spotlightCountry.slug}
        /> : ''
      }
      <ProfileContent>
        <CardContainer>
          <H4 color={red}>
            <Icon name="globe" color={'red'} />
            {
              props.spotlightCountry ?
                <a
                  href={`/spotlight-on-${props.spotlightCountry.slug}`}
                  style={{color: red}}
                  data-cy="Spotlight__Country__Link"
                >
                  Spotlight on {props.spotlightCountry.name}
                </a>
                :
                <a href="/" data-cy="GP__Link" role="link" style={{color: red}}>Global Picture</a>
            }
          </H4>
          {
            props.spotlightCountry ?
              <ProfileSearch
                router={props.router}
                nextLink={props.nextLink}
                placeholder={props.entity.name}
                country={props.spotlightCountry.slug}
              />
              :
              <ProfileSearch
                placeholder={props.entity.name}
                router={props.router}
                nextLink={props.nextLink}
              />
          }
          {
            props.spotlightCountry ?
              <Lead>
                {getDistrictProfilePageData(props.spotlightCountry.slug, props.entity.name)}
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
                  getProfilePageData(props.entity.name)[1].narrative :
                  getProfilePageData(props.entity.name)[2].narrative
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
      </ProfileContent>
    </ProfileHeader>);
};

export default ProfileHeaderSection;
