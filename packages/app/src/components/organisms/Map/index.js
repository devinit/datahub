import * as React from 'react';
import Map from '@devinit/dh-ui/lib/molecules/Map';
import { connect } from 'react-redux';
import { MapBackground } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import { getData } from '@devinit/dh-base/lib/utils';
import { bindActionCreators } from 'redux';
import { changeLoadingStatus } from '../../../redux/actions';
import { MAP_QUERY } from './query.graphql';
const mapDispatchToProps = (dispatch) => ({
    changeLoadingStatus: bindActionCreators(changeLoadingStatus, dispatch),
});
class MapOrganism extends React.Component {
    static getIndicatorId(props) {
        if (props.id)
            return props.id;
        if (props.state && props.state.indicator)
            return props.state.indicator;
        if (props.country === 'uganda')
            return props.app.indicatorUganda;
        if (props.country === 'kenya')
            return props.app.indicatorKenya;
        return props.app.globalIndicator;
    }
    static getIndicatorData(props) {
        const id = MapOrganism.getIndicatorId(props);
        const variables = { id };
        return getData({ query: MAP_QUERY, variables });
    }
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    componentDidMount() {
        this.initData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.app.globalIndicator !== this.props.app.globalIndicator ||
            nextProps.app.indicatorUganda !== this.props.app.indicatorUganda ||
            nextProps.app.indicatorKenya !== this.props.app.indicatorKenya) {
            this.initData(nextProps);
        }
    }
    initData(props) {
        MapOrganism.getIndicatorData(props)
            .then(data => {
            this.data = data;
            this.setState({ loading: false });
            props.changeLoadingStatus(false);
        })
            .catch(console.error);
    }
    render() {
        const mapData = this.data && this.data.mapData;
        return (React.createElement("div", null, !this.state.loading && this.data && this.data.mapData ?
            React.createElement(Map, Object.assign({ state: this.props.state }, mapData)) :
            React.createElement(MapBackground, null)));
    }
}
const mapStateToProps = ({ app }) => ({ app });
const MapWithRedux = connect(mapStateToProps, mapDispatchToProps)(MapOrganism);
export default MapWithRedux;
