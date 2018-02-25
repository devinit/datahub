import * as React from 'react';
import { Grid, SemanticWIDTHS } from 'semantic-ui-react';
import {lighterGrey, lightGrey } from '../../../theme/semantic';
import Select from '../UnbundlingAidSelect';
import { DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';

export interface KeyValue  {
  key: string;
  value: string;
}

export interface Props  {
  aid: string;
  width: SemanticWIDTHS;
  data: any;
  position?: number;
  values: KeyValue[];
  textAlign?: 'left' | 'right'| 'center';
  onMove: (key: string) => void;
  onChange: (key: string) => (value: string) => void;
}

export interface State {
  keys: string[];
}

export default class ToolBarItem extends React.Component<Props, State> {
  public static grid: number = 8;
  public static getValue(values: KeyValue[], key: string): string {
    const obj = values.find(objx => objx.key === key);
    return obj ? obj.value : 'All';
  }
  public static reorder(list: string[], startIndex: number, endIndex: number): string[] {
    const [removed] = list.splice(startIndex, 1); // gets a hold of the item
    list.splice(endIndex, 0, removed); // adds item in new place
    return list;
  }
  public static getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: ToolBarItem.grid * 2,
    margin: `0 0 ${ToolBarItem.grid}px 0`,
    // change background colour if dragging
    background: isDragging ? lightGrey : lighterGrey,
    // styles we need to apply on draggables
    ...draggableStyle,
  })
  constructor(props: Props) {
    super(props);
    const keys = Object.keys(this.props.data).filter(key => key !== 'years');
    this.state = {keys};
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  public onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) return;
    const keys = ToolBarItem.reorder(
      this.state.keys,
      result.source.index,
      result.destination.index
    );
    this.props.onMove(result.draggableId);
    this.setState({
      keys
    });
  }

  public render() {
    const {
      width,
      data,
      position = 0,
      values,
      textAlign,
      aid,
      onChange
    } = this.props;
    return (
      <Grid.Column width={width} textAlign={textAlign || 'right'} verticalAlign="middle">
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div ref={provided.innerRef}>
                  <span style={{display: 'inline'}}>{aid}</span>
                  <div style={{display: 'inline'}}>
                    <Select
                      key={'years'}
                      active
                      value={ToolBarItem.getValue(values, 'years')}
                      options={data.years}
                      onChange={onChange('years')}
                    />
                  </div>
                  {this.state.keys.map(key => (
                    <Draggable key={key} draggableId={key}>
                      {(providedx, snapshotx) => (
                        <div
                          style={{height: '30px', marginLeft: '2px', display: 'inline-block'}}
                        >
                          <div
                            ref={provided.innerRef}
                            style={ToolBarItem.getItemStyle(
                              providedx.draggableStyle,
                              snapshotx.isDragging
                            )}
                            {...providedx.dragHandleProps}
                          >
                            <Select
                              key={key}
                              active={this.state.keys.indexOf(key) <= position}
                              value={ToolBarItem.getValue(values, key)}
                              smallText={key}
                              options={data[key]}
                              onChange={onChange(key)}
                            />
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Grid.Column>
    );
  }
}
