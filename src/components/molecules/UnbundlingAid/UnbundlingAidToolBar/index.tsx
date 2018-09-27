import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import glamorous, { GlamorousComponent } from 'glamorous';
import { lightGrey, lighterGrey } from '../../../theme/semantic';
import Select from '../UnbundlingAidSelect';
import { KeyValue, Selections } from '../types';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { Intro } from '../../../atoms/Intro';
import { howTo } from '../../../../utils/howTo';

export interface Props {
  aidType: string;
  compact?: boolean; // is in compare mode
  toolBarOptions: Selections;
  rightPosition?: number;
  rightValues?: string[];
  position?: number;
  values: KeyValue[];
  textAlign?: 'left' | 'right'| 'center';
  onMove: (key: string) => void;
  onChange: (key: string) => (value: string) => void;
}

export interface State {
  keys: string[];
}

const ToolBarContainer: GlamorousComponent<any, any> = glamorous.div<{compact?: boolean}>(
  {
    'background': lighterGrey,
    '& i.icon': {
      margin: '0 !important'
    }
  },
  props => ({
    padding: props.compact ? '1.76em 0' : '1em 0',
    fontSize: props.compact ? '1em' : '1.7em'
  })
);

export default class ToolBar extends React.Component<Props, State> {
  public static grid = 8;
  public static getValue(values: KeyValue[], key: string): string {
    const obj = values.find(objx => objx.key === key);

    return obj ? obj.value : 'All';
  }

  public static reorder(list: string[], startIndex: number, endIndex: number): string[] {
    const [ removed ] = list.splice(startIndex, 1); // gets a hold of the item
    list.splice(endIndex, 0, removed); // adds item in new place

    return list;
  }

  public static getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `0 ${ToolBar.grid * 2}px 0 ${ToolBar.grid * 2}px`,
    margin: `0 0 ${ToolBar.grid}px 0`,
    // change background colour if dragging
    background: isDragging ? lightGrey : lighterGrey,
    // styles we need to apply on draggables
    ...draggableStyle
  })

  constructor(props: Props) {
    super(props);
    const keys = Object.keys(this.props.toolBarOptions).filter(key => key !== 'years');
    this.state = { keys };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.captureVisualSentence = this.captureVisualSentence.bind(this);
  }

  public onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) { return; }
    const keys = ToolBar.reorder(
      this.state.keys,
      result.source.index,
      result.destination.index
    );
    this.props.onMove(result.draggableId);
    this.setState({
      keys
    });
  }

  render() {
    const {
      position = 1,
      toolBarOptions,
      values = [],
      compact = false,
      textAlign,
      onChange
    } = this.props;
    const aid = this.props.aidType.toUpperCase();

    return (
      <ToolBarContainer compact={ compact }>
        <Container>
          <Grid>
              <Grid.Row>
                <Grid.Column width={ 16 } textAlign={ textAlign || 'center' } verticalAlign="middle">
                  <Intro step={ 1 } intro={ howTo.unbundlingAid.dimensions }>
                    <DragDropContext onDragEnd={ this.onDragEnd }>
                      <Droppable droppableId="droppable" direction="horizontal">
                        { (provided) => (
                          <div ref={ provided.innerRef }>
                            <span style={ { display: 'inline' } }>{ aid }</span>
                            <div style={ { display: 'inline-block' } }>
                              <Select
                                key={ 'years' }
                                active
                                value={ ToolBar.getValue(values, 'years') }
                                options={ toolBarOptions.years }
                                onChange={ onChange('years') }
                              />
                            </div>
                            { this.state.keys.map((key, index) => (
                              <Draggable key={ key } draggableId={ key } index={ index }>
                                { (providedx, snapshot) => (
                                  <div
                                    style={ { height: '30px', marginLeft: '2px', display: 'inline-block' } }
                                  >
                                    <div
                                      ref={ providedx.innerRef }
                                      style={ ToolBar.getItemStyle(
                                        providedx.draggableProps.style,
                                        snapshot.isDragging
                                      ) }
                                      { ...providedx.dragHandleProps }
                                    >
                                      <Select
                                        key={ key }
                                        active={ this.state.keys.indexOf(key) <= position }
                                        value={ ToolBar.getValue(values, key) }
                                        smallText={ key }
                                        options={ toolBarOptions[key] }
                                        onChange={ onChange(key) }
                                      />
                                    </div>
                                    { provided.placeholder }
                                  </div>
                                ) }
                              </Draggable>
                            )) }
                            { provided.placeholder }
                          </div>
                        ) }
                      </Droppable>
                    </DragDropContext>
                  </Intro>
                </Grid.Column>
              </Grid.Row>
          </Grid>
        </Container>
      </ToolBarContainer>
    );
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.captureVisualSentence);
  }

  componentWillUnmount() {
    this.captureVisualSentence();
    window.removeEventListener('beforeunload', this.captureVisualSentence); // remove the event handler for normal unmounting
  }

  private captureVisualSentence() {
    const { aidType, toolBarOptions, values = [] } = this.props;
    const sentence: any = {};
    this.state.keys.forEach(key => {
      const value = ToolBar.getValue(values, key);
      const options = toolBarOptions[key];
      if (value !== 'All') {
        const item = options.find(obj => obj.key === value);

        sentence[key] = item ? item.name : value;
      } else {
        return sentence[key] = 'All';
      }
    });
    sentence.aidType = aidType;
    sentence.year = ToolBar.getValue(values, 'years');

    this.updateUnbundlingAnalytics(sentence);
  }

  private updateUnbundlingAnalytics(sentence: any) {
    if ((window as any).gtag) {
      (window as any).gtag('event', sentence.aidType === 'oda' ? 'UnbundlingAid' : 'UnbundlingOOF', {
        event_category: sentence.to,
        event_label: JSON.stringify(sentence)
      });
    }
  }
}
