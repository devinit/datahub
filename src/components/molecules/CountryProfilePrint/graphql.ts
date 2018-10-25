import gql from 'graphql-tag';
import { ChildProps } from 'react-apollo';
import { TabDataQuery } from '../../gql-types';

export const PRINT_PAGE_QUERY = gql`
  query PrintPageQuery($id: String!) {
    printNarratives(id: $id) {
      key
      value
      type
      next
    }
    governmentFinance(id: $id) {
    totalRevenue {
      value
    }
    grantsAsPcOfRevenue {
      value
    }
    spendingAllocation {
      data {
        value
        name
      }
    }
    currencyCode
    supportLocalCurrencyOnly
  }
  povertyTab(id: $id) {
    poverty190Trend {
      data {
        year
        value
        name
      }
    }
    depthOfExtremePoverty {
      value
    }
    incomeDistTrend {
      data {
        value
        quintileName
      }
    }
  }
  populationTab(id: $id) {
    population {
      value
    }
    populationDistribution {
      data {
        group
        value
        year
      }
    }
    populationPerAgeBand {
      data {
        band
        value
        year
      }
    }
  }
  internationalResources(id: $id) {
    GNI {
      value
    }
    netODAOfGNIIn {
      value
    }
    netODAOfGNIOut {
      value
    }
    mixOfResources {
      data {
        flow_name
        value
      }
    }
    resourceflowsOverTime {
      data {
        year
        name
        value
      }
    }
  }
  overviewTab(id: $id) {
    poorestPeople {
      value
    }
    population {
      value
    }
    domesticResources {
      value
    }
    internationalResources {
      value
    }
    governmentSpendPerPerson {
      value
    }
    averageIncomerPerPerson {
      data {
        year
        value
        name
      }
    }
    incomeDistTrend {
      data {
        value
        quintileName
      }
    }
  }
  }`;

export interface PrintPageQueryVariables {
  id: string;
}

export interface PrintNarrative {
  key: string;
  value: string;
  type: string;
  next: string;
}

export interface PrintPageQuery extends TabDataQuery {
  printNarratives: [ PrintNarrative ];
}

export type PrintNarrativeProps = ChildProps<PrintPageQueryVariables, PrintPageQuery>;
