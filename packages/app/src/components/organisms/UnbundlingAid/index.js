import * as React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { Div } from 'glamorous';
import { graphql } from 'react-apollo';
import TotalODA from '@devinit/dh-ui/lib/molecules/UnbundlingAidTotalODA';
import UnbundlingTreemap from '@devinit/dh-ui/lib/molecules/UnbundlingTreemap';
import UnbundlingAidTour from '@devinit/dh-ui/lib/atoms/UnbundlingAidTour';
import TourContainer from '@devinit/dh-ui/lib/molecules/TourContainer';
import QUERY from './query.graphql';
import dataODA from './data-oda';
import dataOOF from './data-oof';
const withData = graphql(QUERY, {
    options: props => ({
        variables: {
            args: {
                aidType: props.aidType,
                year: props.startYear,
                groupBy: 'to_di_id',
            },
        },
    })
});
const toDropDownOptions = list => [
    { name: 'All', value: '', key: 'all', active: true },
    ...list.map(({ id, name }) => ({ name, value: id, key: id })),
];
const unbundlingSelections = (aidType, startYear) => {
    const { channels = [], bundles = [], to = [], from = [], sectors = [], years = [] } = aidType === 'oda' ? dataODA.selections : dataOOF.selections;
    return {
        years: years.map(year => ({
            name: year,
            value: year,
            active: year === startYear,
        })),
        to: toDropDownOptions(to),
        from: toDropDownOptions(from),
        sectors: toDropDownOptions(sectors),
        forms: toDropDownOptions(bundles),
        channels: toDropDownOptions(channels),
    };
};
const WithData = withData(({ data, aidType, startYear, compact }) => {
    const selections = unbundlingSelections(aidType, startYear);
    if (!data)
        return React.createElement("p", null, "data key is missing");
    const safeBundles = data.bundles && data.bundles.length ? data.bundles : [];
    const bundleSum = safeBundles.reduce((sum, datum) => sum + (datum && datum.value || 0), 0);
    const props = {
        startYear,
        aidType,
        compact,
        loading: data.loading === undefined ? true : data.loading,
        selections,
        bundles: safeBundles,
        bundleSum,
        refetch: data.refetch,
    };
    if (data.error)
        return React.createElement(UnbundlingTreemap, Object.assign({}, props));
    return React.createElement(UnbundlingTreemap, Object.assign({}, props));
});
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compare: false,
            showTreemap: props.tourVisible,
            showTour: props.tourVisible,
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            showTreemap: this.state.showTreemap || props.tourVisible,
            showTour: props.tourVisible,
        });
    }
    showTreemapHandler() {
        this.setState({ showTreemap: true });
    }
    toggleCompare() {
        this.setState({ compare: !this.state.compare });
    }
    closeTour() {
        this.setState({
            showTour: false,
        });
    }
    render() {
        const startYear = this.props.aidType === 'oda' ? dataODA.yearTotal.year : dataOOF.yearTotal.year;
        const uProps = { ...this.props, startYear };
        return (React.createElement(Div, { position: "relative" },
            !this.state.showTreemap ?
                React.createElement(TotalODA, { onClickHandler: this.showTreemapHandler, yearTotal: this.props.aidType === 'oda' ? dataODA.yearTotal : dataOOF.yearTotal, aidType: this.props.aidType }) :
                !this.state.compare
                    ? React.createElement(WithData, Object.assign({}, uProps))
                    : React.createElement(Grid, { style: { margin: 0 } },
                        React.createElement(Grid.Row, { style: { padding: 0 } },
                            React.createElement(Grid.Column, { width: 8, style: { padding: 0 } },
                                React.createElement(WithData, Object.assign({ compact: true }, uProps))),
                            React.createElement(Grid.Column, { width: 8, style: { padding: 0 } },
                                React.createElement(WithData, Object.assign({ compact: true }, uProps))))),
            React.createElement(Button, { style: { position: 'absolute', right: '1em', top: '1.2em' }, onClick: this.toggleCompare }, this.state.compare
                ? React.createElement("span", null,
                    "Close ",
                    React.createElement(Icon, { name: "close" }))
                : React.createElement("span", null,
                    "Compare ",
                    React.createElement(Icon, { name: "plus" }))),
            React.createElement(TourContainer, { visible: this.state.showTour, closeHandler: this.closeTour },
                React.createElement(UnbundlingAidTour, { aidType: this.props.aidType === 'oda' ? 'ODA' : 'OOFs' }))));
    }
}
export default Chart;
