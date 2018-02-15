import gql from 'graphql-tag';

export default gql`
query SpotLightTabData($id: String!, $country: String!) {
  povertyTabRegional(id: $id, country: $country) {
    ... on PovertyTabUg {
      poorestPeople {
          value
          toolTip {
            source
            heading
          }
      }
      lifeExpectancy {
        value
        toolTip {
          source
          heading
        }
      }
      stdOfLiving {
        value
        toolTip {
          source
          heading
        }
      }
    }
    ... on PovertyTabKe {
      poorestPeople {
            value
            toolTip {
              source
              heading
            }
        }
      meanExpenditure {
        value
        toolTip {
          source
          heading
        }
      }
      povertyGap {
        value
        toolTip {
          source
          heading
        }
      }
    }
  }
  overviewTabRegional(id: $id, country: $country) {
    poorestPeople {
      value
      toolTip {
        source
        heading
      }
    }
    regionalResources {
      value
      value_ncu
      toolTip {
        source
        heading
      }
    }
    regionalResourcesBreakdown {
      data {
        id
        year
        value
        name
        color
      }
      toolTip {
        source
        heading
      }
    }
    localGovernmentSpendPerPerson {
      value
      toolTip {
        source
        heading
      }
    }
  }
  populationTabRegional(id: $id, country: $country) {
    ... on PopulationTabRegionalUg {
      totalPopulation {
          value
          toolTip {
            source
            heading
          }
      }
      populationDensity {
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
      averageDependencyRatio {
        value
        toolTip {
          source
          heading
        }
      }
      allAverageDependencyRatio {
        value
        toolTip {
          source
          heading
        }
      }
    }
    ... on PopulationTabRegionalKe {
      totalPopulation {
        value
        toolTip {
          source
          heading
        }
      }
      populationDensity {
        value
        toolTip {
          source
          heading
        }
      }
      populationBirthRate {
        value
        toolTip {
          source
          heading
        }
      }
    }
  }
  educationTabRegional(id: $id, country: $country) {
    ... on EducationTabRegionalUg {
      pupilTeacherRatioGovtSchl {
        value
        toolTip {
          source
          heading
        }
      }
      pupilTeacherRatioOtherSchl {
        value
        toolTip {
          source
          heading
        }
      }
      studentsPassRate {
        value
        toolTip {
          source
          heading
        }
      }
      studentsPassDistrictRank {
        value
        toolTip {
          source
          heading
        }
      }
      primaryEducationfunding {
        value
        value_ncu
        toolTip {
          source
          heading
        }
      }
    }
    ... on EducationTabRegionalKe {
       primaryPupilTeacherRatioAllSchl {
        value
        toolTip {
          source
          heading
        }
      }
      primaryTeacherRatioPublicSchl {
        value
        toolTip {
          source
          heading
        }
      }
      primaryTeacherRatioPrivateSchl {
        value
        toolTip {
          source
          heading
        }
      }
    }
  }
  healthTabRegional(id: $id, country: $country) {
    ... on HealthTabRegionalUg {
      districtPerformance {
        value
        toolTip {
          source
          heading
        }
      }
      districtHealthRank {
        value
      }
      treatmeantOfTb {
        value
        toolTip {
          source
          heading
        }
      }
      healthCareFunding {
        value
        value_ncu
        toolTip {
          source
          heading
        }
      }
    }
    ... on HealthTabRegionalKe {
      birthAttendanceSkilled {
        value
        toolTip {
          source
          heading
        }
      }
      contraceptiveUse {
        value
        toolTip {
          source
          heading
        }
      }
      healthCareFunding {
        value
        toolTip {
            source
            heading
          }
      }
    }
  }
}`;
