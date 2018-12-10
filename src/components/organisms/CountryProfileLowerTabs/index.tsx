import * as React from 'react';
import { getCountry } from '../../../utils';
import { GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS, INTERNATIONAL_RESOURCES } from '../../../utils/constants';
import Pane from '../../atoms/Pane';
import { StateToShare } from '../../molecules/ChartShare';
import GovernmentFinance from '../../molecules/CountryProfileTabs/GovernmentFinanceLower';
import InternationalResourcesLower from '../../molecules/CountryProfileTabs/InternationalResourcesLower';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import Tabs from '../../molecules/Tabs';
import { getCountryProfileData } from '../../pageData';
import GovernmentFinanceChart from '../GovernmentFinance';
import InflowsVsOutflows from '../InflowsVsOutflows';
import InternationalResourcesChart from '../InternationalResourcesChart';
import data from './data';
import { Country, PageUnit } from '../../types';

export type Props = StateToShare & {
  id: string,
  selectedTab?: number
};

export default class CountryProfileLowerTabs extends React.Component<Props, { toolTip: any, dataLoaded: boolean }> {
  constructor(props) {
    super(props);

    this.state = { toolTip: data.internationalResources.resourcesOverTime.toolTip, dataLoaded: false };
    this.onInternationFinanceDataLoaded = this.onInternationFinanceDataLoaded.bind(this);
  }

  render() {
    const country = getCountry(this.props.id);
    const pageData = getCountryProfileData(this.props.id);
    const selectedTab = this.props.selectedTab || 0;

    return (
      <Tabs textAlign="center" selected={ selectedTab }>
        { this.renderGovernmentFinancePane(country, pageData, this.props) }
        { this.renderInternationalResourcesPane(pageData, this.props) }
      </Tabs>
    );
  }

  private renderGovernmentFinancePane(country: Country, pageData: PageUnit[], props: Props) {
    if (Number(country.has_domestic_data)) {
      return (
        <Pane label="GOVERNMENT FINANCE" id={ GOVERNMENT_FINANCE_LOWER }>
          <ErrorBoundary>
            <GovernmentFinance
              pageData={ pageData }
              countryName={ country && country.name ? country.name : props.id }
            >
              <ErrorBoundary>
                <GovernmentFinanceChart
                  budgetType={ props.budgetType }
                  shouldScrollIntoView={ props.chartId === GOVERNMENT_FINANCE_LOWER }
                  id={ props.id }
                  year={ props.year }
                  chartId={ GOVERNMENT_FINANCE_LOWER }
                />
              </ErrorBoundary>
            </GovernmentFinance>
          </ErrorBoundary>
        </Pane>
      );
    }

    return null;
  }

  private renderInternationalResourcesPane(pageData: PageUnit[], props: Props) {
    return (
      <Pane label="INTERNATIONAL RESOURCES" id={ INTERNATIONAL_RESOURCES }>
          <InternationalResourcesLower pageData={ pageData } toolTip={ this.state.toolTip }>
            <ErrorBoundary>
              <InflowsVsOutflows
                id={ props.id }
                shouldScrollIntoView={ props.chartId === INFLOWS_VS_OUTFLOWS }
                chartId={ INFLOWS_VS_OUTFLOWS }
                year={ props.chartId === INFLOWS_VS_OUTFLOWS ? props.year : 2016 } // FIXME: this is a hack
                onDataLoaded={ this.onInternationFinanceDataLoaded }
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <InternationalResourcesChart
                year={ props.chartId === INTERNATIONAL_RESOURCES ? (props.year as number) : 2016 } // FIXME: this is a hack
                id={ props.id }
              />
            </ErrorBoundary>
          </InternationalResourcesLower>
        </Pane>
    );
  }

  private onInternationFinanceDataLoaded({ toolTip }: any) {
    if (!this.state.dataLoaded) {
      this.setState({ toolTip, dataLoaded: true });
    }
  }
}
