import glamorous, { H4, Img, P, Span } from 'glamorous';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { LinkState } from 'next/link';
// import {SmallMapProps} from '../Maps';
import { SingletonRouter } from 'next/router';
import * as React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { CurrencyOption } from '../../../utils';
import { DONOR, GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS } from '../../../utils/constants';
import { CardContainer, ProfileHeader } from '../../atoms/Container';
import { Lead } from '../../atoms/Header';
import { BodyLink } from '../../atoms/Link';
import { getDistrictProfilePageData, getProfilePageData } from '../../pageData';
import { mediaQueries } from '../../theme';
import { red } from '../../theme/semantic';
import { Country, District } from '../../types';
import ProfileSocialMedia from '../ProfileSocialMedia';
import { ProfileSearch } from '../SearchInput';

const dynamicOpts: DynamicOptions<any, any> = {
    ssr: false,
    loading: () => (<p>Loading...</p>),
    modules: () => ({
        SmallMap: import('../Maps/SmallMap') as Promise<any>
    }),
    render: (props, { SmallMap }) => <SmallMap { ...props } />
};
const ProfileContent = glamorous.div({
  width: '60%',
  marginLeft: '11%',
  position: 'absolute',
  top: 0,
  [mediaQueries.tabs]: {
    width: '100%',
    marginLeft: '0%'
  }
});
// SmallMapProps type should be used here, but react / next/dynamic issues wont let it happen
const DynamicMapComponent = dynamic(dynamicOpts as any) as React.StatelessComponent<any>;

export interface Props {
  router?: SingletonRouter;
  nextLink?: React.ComponentClass<LinkState>;
  entity: Country | District; // country or district
  jumpToSection?: (sectionId: string) => void;
  currency?: string;
  currencyOptions?: CurrencyOption[];
  onChangeCurrency ?: (currency: string) => void;
  spotlightCountry?: Country;
}

class ProfileHeaderSection extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.jumpToSection = this.jumpToSection.bind(this);
  }

  render() {
    return (
      <ProfileHeader>
        { this.renderDynamicMapComponent() }
        <ProfileContent>
          <CardContainer>
            <H4 color={ red }>
              <Icon name="globe" color={ 'red' } />
              { this.renderLink(this.props) }
            </H4>
            <ProfileSearch
              router={ this.props.router }
              nextLink={ this.props.nextLink }
              placeholder={ this.props.entity.name }
              country={ this.props.spotlightCountry && this.props.spotlightCountry.slug }
            />
            { this.renderLead(this.props) }
            { this.renderJumpToSection() }
            { this.renderArticle() }
            {
              (process as any).browser
                ?
                  <ProfileSocialMedia
                    isCountryProfile={ !this.props.spotlightCountry }
                    entity={ this.props.entity }
                  />
                : ''
            }
          </CardContainer>
        </ProfileContent>
      </ProfileHeader>);
  }

  private renderDynamicMapComponent(): React.ReactNode {
    if (process.env.NODE_ENV !== 'test' && (process as any).browser) {
      return (
        <DynamicMapComponent
          slug={ this.props.entity.slug || '' }
          spotlightCountry={ this.props.spotlightCountry && this.props.spotlightCountry.slug }
        />
      );
    }

    return null;
  }

  private renderLink(props: Props) {
    if (props.spotlightCountry) {
      return (
        <a
          href={ `/spotlight-on-${props.spotlightCountry.slug}` }
          style={ { color: red } }
          data-cy="Spotlight__Country__Link"
        >
          Spotlight on { props.spotlightCountry.name }
        </a>
      );
    }

    return <a href="/" data-cy="GP__Link" role="link" style={ { color: red } }>Global Picture</a>;
  }

  private renderLead(props: Props) {
    if (props.spotlightCountry) {
      return (
        <Lead>
          { getDistrictProfilePageData(props.spotlightCountry.slug, props.entity.name) }
          <Span fontWeight={ 500 } lineHeight="3" fontSize="0.7em" display="block">
            Visit the { ' ' }
            <BodyLink href={ `/country/${props.spotlightCountry.slug}` }>
              { props.spotlightCountry.name } country Profile
            </BodyLink>
            { ' ' }to explore national-level data.
          </Span>
        </Lead>
      );
    }

    return (
      <Lead>
        {
          (this.props.entity as Country).countryType !== DONOR
            ? getProfilePageData(this.props.entity.name)[1].narrative
            : getProfilePageData(this.props.entity.name)[2].narrative
        }
        <Img marginLeft="10px" width="32px" src={ `/flags/svg/${this.props.entity.id}.svg` } />
        {
          this.props.entity.slug === 'uganda'
            ? <Span fontSize="0.7em" display={ 'block' } fontWeight={ 500 } >
                Visit our new <BodyLink href="/spotlight-on-uganda">
                Spotlight on Uganda</BodyLink> to explore data by district.</Span>
            : ''
        }
      </Lead>
    );
  }

  private renderJumpToSection(): React.ReactNode {
    if (this.props.jumpToSection) {
      return (
        <Span>
          Jump to {
            (this.props.entity as Country).countryType !== DONOR
              ?
                <span>
                  <BodyLink
                    onClick={ this.jumpToSection(GOVERNMENT_FINANCE_LOWER) }
                    color={ red }
                  >
                    government finance
                  </BodyLink> or { ' ' }
                </span> : ''
          }
          <BodyLink
            color={ red }
            onClick={ this.jumpToSection(INFLOWS_VS_OUTFLOWS) }
          >international resources
          </BodyLink>
        </Span>
      );
    }

    return '';
  }

  private renderArticle(): React.ReactNode {
    if (this.props.spotlightCountry) {
      return (
        <article>
          <P fontWeight={ 500 } fontSize="1.2em" lineHeight="0">View all financial data in: </P>
          <Dropdown
            compact
            selection
            value={ this.props.currency }
            options={ this.props.currencyOptions }
            // tslint:disable-next-line:jsx-no-lambda
            onChange={ (_e, data) =>
              this.props.onChangeCurrency && data.value && this.props.onChangeCurrency(data.value.toString())
            }
          />
        </article>
      );
    }

    return '';
  }

  private jumpToSection(section: string) {
    return () => this.props.jumpToSection && this.props.jumpToSection(section);
  }
}

export default ProfileHeaderSection;
