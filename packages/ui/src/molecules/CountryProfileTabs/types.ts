import '@devinit/datahub-api';

export interface TabsData {
    governmentFinance: DH.IGovernmentFinance | null;
    povertyTab: DH.IPovertyTab | null;
    populationTab: DH.IPopulationTab | null;
    internationalResources: DH.IInternationalResources | null;
    overviewTab: DH.IOverviewTab | null;
}
