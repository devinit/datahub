import { Div } from 'glamorous';
import * as React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { Intro } from '../../../atoms/Intro';
import { TabsToolTip } from '../../ToolTip';
import { SelectWrapper, Wrapper } from './styles';
import { howTo } from '../../../../utils/howTo';

export interface Option {
  key: string;
  value: string;
  text?: string;
}

export interface Props {
  options: Option[];
  activeIndicator: string;
  onChange?: (event: any, data: Option[]) => void;
  showUsingThisViz?: boolean;
  toolTip?: { heading: string, source: string };
  onUsingThisVizHandler?: (event: any) => void;
}

class Select extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  render() {
    const { toolTip, onUsingThisVizHandler, showUsingThisViz } = this.props;

    return (
      <Wrapper>
        <SelectWrapper>
          <Intro step={ 2 } intro={ howTo.globalPicture.indicator }>
            <Dropdown
              selection
              scrolling
              fluid
              options={ this.props.options }
              onChange={ this.onChange }
              value={ this.props.activeIndicator }
            />
          </Intro>
        </SelectWrapper>
        { toolTip ? <TabsToolTip { ...toolTip } /> : '' }
        <Div display={ showUsingThisViz ? 'inline-block' : 'none' }>
          <Button size="medium" onClick={ onUsingThisVizHandler }>
            Using this visualization
          </Button>
        </Div>
      </Wrapper>
    );
  }

  private onChange(event: React.SyntheticEvent<HTMLElement>, data: any) {
    if (this.props.onChange) {
      this.props.onChange(event, data.options);
    }
  }
}

export default Select;
