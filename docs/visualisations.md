# DDH Visualisations
This file documents all DDH visualisations, explainining their purpose, where they get their data, and where you can find them in the code.

## Global Picture
|Option|Value|
|------------|------------------------------------------------------------------------------------|
|URL| http://data.devinit.org/[global-picture]|
|Concept File| https://github.com/devinit/datahub-cms/blob/development/global-picture/concept.csv|

## Ranking Tables

![RankingTables](/docs/assets/global-picture-ranking-tables.png)

|Option|Value|
|------------|------------------------------------------------------------------------------------|
|Code Path| src/components/molecules/Maps/Map/index.tsx|
|GitHub Code Path|https://github.com/devinit/datahub/blob/master/src/components/molecules/Maps/Map/index.tsx#L158|

## Country Profiles
|Option|Value|
|------------|------------------------------------------------------------------------------------|
|URL template| http://data.devinit.org/country/[country-slug]|
|Concept File| https://github.com/devinit/datahub-cms/blob/development/country-profile/concept.csv|

### Overview Tab -> Poorest People

![PoorestPeople](/docs/assets/country-profile-overview-poorest-people.png)

|Option|Value|
|------------------|----------------------------------------------------------------------------------|
|DDW table/Concept ID|data_series.poorest_20_percent|
|SQL query|https://github.com/devinit/datahub-api/blob/master/src/modules/dw/CountryProfile/sql.ts#L15|
|Code Path|https://github.com/devinit/datahub/tree/development/src/components/molecules/CountryProfileTabs/Overview|
