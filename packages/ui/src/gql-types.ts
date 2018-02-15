/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface UnbundlingAidQuery {
  // oda or oof
  aidType: string,
  year: number,
  // eg channel, bundle
  groupBy: string,
  to_di_id?: string | null,
  from_di_id?: string | null,
  // form is same as buddle
  bundle?: string | null,
  sector?: string | null,
  channel?: string | null,
};

export interface TabDataQueryVariables {
  id: string,
};

export interface TabDataQuery {
  governmentFinance:  {
    // Total revenue for a particular
    totalRevenue:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    grantsAsPcOfRevenue:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // for donut chart
    spendingAllocation:  {
      toolTip:  {
        source: string,
        heading: string,
      },
      data:  Array< {
        value: number,
        name: string,
        color: string,
      } | null > | null,
    } | null,
    // for treemap
    // such as constant 2015 USD for tree map
    currencyCode: string | null,
  } | null,
  povertyTab:  {
    // Poverty reduction over time area chart trend
    poverty190Trend:  {
      data:  Array< {
        year: number,
        uid: string,
        value: number | null,
        name: string,
      } | null >,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // how deep is poverty %
    depthOfExtremePoverty:  {
      value: string | null,
      toolTip:  {
        heading: string,
        source: string,
      },
    } | null,
    // Recipients: how income is distributed, % of income received by each quintil
    incomeDistTrend:  {
      data:  Array< {
        value: number,
        quintileName: string,
      } | null >,
      toolTip:  {
        heading: string,
        source: string,
      } | null,
    } | null,
  } | null,
  populationTab:  {
    // total population in a country
    population:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // Urban vs Rural population level
    populationDistribution:  {
      data:  Array< {
        group: string,
        value: number,
        year: number,
      } | null >,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // Number of people in 3 age bands (65+, 15- 65, 0 - 14)
    populationPerAgeBand:  {
      data:  Array< {
        band: string,
        value: number,
        year: number,
      } | null >,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
  } | null,
  internationalResources:  {
    // Gross National Income
    GNI:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // Net ODA received, % of GNI for recipient countries
    netODAOfGNIIn:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // Net ODA out, % of GNI for recipient countries
    netODAOfGNIOut:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // Whats the mix of resources can be for donors (out flows) or receipient (in flows)
    // this is for the donut chart
    mixOfResources:  {
      data:  Array< {
        flow_name: string,
        color: string,
        value: number,
      } | null >,
      toolTip:  {
        heading: string,
        source: string,
      },
    },
    // for line chart in the  international resources tabs section,
    // IndicatorDataColoredWithToolTip  is defined in spotlight types
    resourceflowsOverTime:  {
      data:  Array< {
        year: number,
        name: string,
        color: string | null,
        value: number | null,
      } | null >,
      toolTip:  {
        heading: string,
        source: string,
      },
    },
  } | null,
  overviewTab:  {
    // how many of the poorest people globally live in a country
    poorestPeople:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // total population for a given country
    population:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    domesticResources:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    internationalResources:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // recipient countries $PPP, both donor and recipient
    governmentSpendPerPerson:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // donor: gross nation income per capit GNI
    averageIncomerPerPerson:  {
      data:  Array< {
        year: number,
        value: number | null,
        name: string,
        uid: string,
      } | null >,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // donor: Income share by quintile
    incomeDistTrend:  {
      data:  Array< {
        value: number,
        quintileName: string,
      } | null >,
      toolTip:  {
        source: string,
        heading: string,
      } | null,
    } | null,
  } | null,
};

export interface GvmtFinanceQueryVariables {
  id: string,
};

export interface GvmtFinanceQuery {
  governmentFinance:  {
    startYear: number,
    // for treemap
    // such as constant 2015 USD for tree map
    currencyCode: string | null,
    currencyUSD: string | null,
    // use resourcesRecipient sql
    expenditure:  Array< {
      uid: string,
      year: number,
      levels: Array< string | null >,
      color: string,
      // eg Actual or budget
      budget_type: string,
      value: number,
      value_ncu: number,
    } | null > | null,
    revenueAndGrants:  Array< {
      uid: string,
      year: number,
      levels: Array< string | null >,
      color: string,
      // eg Actual or budget
      budget_type: string,
      value: number,
      value_ncu: number,
    } | null > | null,
    finance:  Array< {
      uid: string,
      color: string,
      year: number,
      levels: Array< string | null >,
      // eg Actual or budget
      budget_type: string,
      value: number,
      value_ncu: number,
    } | null > | null,
  } | null,
};

export interface ResourcesOverTimeQueryVariables {
  id: string,
};

export interface ResourcesOverTimeQuery {
  internationalResources:  {
    startYear: number,
    // for sidebar chart in international resources section & area partition tree chart default data
    resourcesOverTime:  {
      data:  Array< {
        uid: string,
        year: number,
        value: number,
        flow_id: string,
        flow_name: string,
        short_name: string,
        // Category i.e FDI, ODA
        flow_category: string,
        // flow either inflow or outflow
        flow_type: string,
        // i.e contains flow type as 1st level, flow category as second and flow name as 3rd
        // levels: [String]
        // in or out
        direction: string,
        color: string,
      } | null >,
    },
  } | null,
};

export interface GovernmentFinanceQueryVariables {
  id: string,
  country: string,
};

export interface GovernmentFinanceQuery {
  localGovernmentFinance:  {
    startYear: number,
    currencyCode: string,
    currencyUSD: string,
    expenditure:  Array< {
      uid: string,
      year: number,
      color: string,
      levels: Array< string | null >,
      // eg Actual or budget
      budget_type: string,
      value: number,
      value_ncu: number,
    } | null >,
    // come from finance file
    revenueAndGrants:  Array< {
      uid: string,
      color: string,
      year: number,
      levels: Array< string | null >,
      // eg Actual or budget
      budget_type: string,
      value: number,
      value_ncu: number,
    } | null >,
  } | null,
};

export interface SpotLightTabDataQueryVariables {
  id: string,
  country: string,
};

export interface SpotLightTabDataQuery {
  povertyTabRegional: ( {
      poorestPeople:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // WHAT IS THE AVERAGE LIFE EXPECTANCY?
      lifeExpectancy:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // WHAT IS THE STANDARD OF LIVING SCORE?
      stdOfLiving:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    } | {
      poorestPeople:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // WHAT IS THE AVERAGE LIFE EXPECTANCY?
      meanExpenditure:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // WHAT IS THE STANDARD OF LIVING SCORE?
      povertyGap:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    }
  ) | null,
  // id is district slug
  overviewTabRegional:  {
    // WHAT PERCENTAGE OF PEOPLE IN WAKISO LIVE BELOW THE NATIONAL POVERTY LINE?
    // can be no data or '12%'
    poorestPeople:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN WAKISO? eg 3.6m or 2.7bn
    // this is a total of local, donor and central government resources
    regionalResources:  {
      value: string | null,
      value_ncu: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
    // IndicatorDataColored is defined in country profile types
    // has local government, donor and central government
    regionalResourcesBreakdown:  Array< {
      data:  {
        id: string,
        year: number,
        value: number | null,
        name: string,
        color: string | null,
      },
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null > | null,
    // HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
    localGovernmentSpendPerPerson:  {
      value: string | null,
      toolTip:  {
        source: string,
        heading: string,
      },
    } | null,
  } | null,
  populationTabRegional: ( {
      // The total population of a given district and the population density in per sq km
      totalPopulation:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      populationDensity:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // Urban vs Rural population level
      populationDistribution:  {
        data:  Array< {
          group: string,
          value: number,
          year: number,
        } | null >,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      averageDependencyRatio:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      allAverageDependencyRatio:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    } | {
      // The total population of a given district and the population density in per sq km
      totalPopulation:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      populationDensity:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      populationBirthRate:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    }
  ) | null,
  educationTabRegional: ( {
      // WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?...in government schools  and...in all schools
      pupilTeacherRatioGovtSchl:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      pupilTeacherRatioOtherSchl:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
      studentsPassRate:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      studentsPassDistrictRank:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
      primaryEducationfunding:  {
        value: string | null,
        value_ncu: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    } | {
      // WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?...in government schools  and...in all schools
      primaryPupilTeacherRatioAllSchl:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      primaryTeacherRatioPublicSchl:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      primaryTeacherRatioPrivateSchl:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    }
  ) | null,
  healthTabRegional: ( {
      birthAttendanceSkilled:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      contraceptiveUse:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      healthCareFunding:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    } | {
      // WHAT IS THE DISTRICT LEAGUE HEALTH PERFORMANCE SCORE?
      districtPerformance:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      districtHealthRank:  {
        value: string | null,
      } | null,
      // WHAT PERCENTAGE OF TUBERCULOSIS CASES HAVE BEEN SUCCESSFULLY TREATED?
      treatmeantOfTb:  {
        value: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
      // HOW MUCH LOCAL GOVERNMENT HEALTHCARE FUNDING IS THERE?
      healthCareFunding:  {
        value: string | null,
        value_ncu: string | null,
        toolTip:  {
          source: string,
          heading: string,
        },
      } | null,
    }
  ) | null,
};

export interface UnbundlingAidDataQueryVariables {
  args?: UnbundlingAidQuery | null,
};

export interface UnbundlingAidDataQuery {
  bundles:  Array< {
    uid: string,
    id: string,
    // country or organisation or channel or bundle name
    name: string,
    // this will usually be a summed up aggregate value
    value: number,
    color: string,
  } | null > | null,
};

export interface UnbundlingInternationalResourcesQueryVariables {
  resourceId: string,
  countryId: string,
  groupById: string,
};

export interface UnbundlingInternationalResourcesQuery {
  // for area tree map chart dropdown selectoion
  singleResource:  {
    color: string,
    resources:  Array< {
      id: string,
      name: string,
      value: number | null,
      year: number,
    } | null >,
  } | null,
};
