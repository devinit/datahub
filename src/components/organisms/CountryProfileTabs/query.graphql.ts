import gql from 'graphql-tag';

export const TAB_QUERY = gql`
 query TabData($id: String!) {
  governmentFinance(id: $id) {
    totalRevenue {
      value
      toolTip {
        source
        heading
      }
    }
    grantsAsPcOfRevenue {
      value
      toolTip {
        source
        heading
      }
    }
    spendingAllocation {
      toolTip {
        source
        heading
      }
      data {
        value
        name
        color
      }
    }
    currencyCode
    supportLocalCurrencyOnly
  }
  povertyTab(id: $id) {
    poverty190Trend {
      data {
        year
        uid
        value
        name
      }
      toolTip {
        source
        heading
      }
    }
    depthOfExtremePoverty {
      value
      toolTip {
        heading
        source
      }
    }
    incomeDistTrend {
      data {
        value
        quintileName
      }
      toolTip {
        heading
        source
      }
    }
  }
  populationTab(id: $id) {
    population {
      value
      toolTip {
        source
        heading
      }
    }
    populationDistribution {
      data {
        group
        value
        year
      }
      toolTip {
        source
        heading
      }
    }
    populationPerAgeBand {
      data {
        band
        value
        year
      }
      toolTip {
        source
        heading
      }
    }
  }
  internationalResources(id: $id) {
    GNI {
      value
      toolTip {
        source
        heading
      }
    }
    netODAOfGNIIn {
      value
      toolTip {
        source
        heading
      }
    }
    netODAOfGNIOut {
      value
      toolTip {
        source
        heading
      }
    }
    mixOfResources {
      data {
        flow_name
        color
        value
      }
      toolTip {
        heading
        source
      }
    }
    resourceflowsOverTime {
      data {
        year
        name
        color
        value
      }
      toolTip {
        heading
        source
      }
    }
  }
  overviewTab(id: $id) {
    poorestPeople {
      value
      toolTip {
        source
        heading
      }
    }
    population {
      value
      toolTip {
        source
        heading
      }
    }
    domesticResources {
      value
      toolTip {
        source
        heading
      }
    }
    internationalResources {
      value
      toolTip {
        source
        heading
      }
    }
    governmentSpendPerPerson {
      value
      toolTip {
        source
        heading
      }
    }
    averageIncomerPerPerson {
      data {
        year
        value
        name
        uid
      }
      toolTip {
        source
        heading
      }
    }
    incomeDistTrend {
      data {
        value
        quintileName
      }
      toolTip {
        source
        heading
      }
    }
  }
}`;
