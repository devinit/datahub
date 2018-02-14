import '@devinit/datahub-api';
import { PageUnit} from '@devinit/dh-base/lib/pageData';

export interface SpotLightTabData {
    povertyTabRegional: DH.PovertyTabRegional;
    overviewTabRegional: DH.IOverviewTabRegional;
    populationTabRegional: DH.PopulationTabRegional;
    educationTabRegional: DH.EducationTabRegional;
    healthTabRegional: DH.HealthTabRegional;
}
export interface CProps {
    currency: string;
    pageData: PageUnit[];
}

export type CSProps = CProps & SpotLightTabData;
