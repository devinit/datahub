// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import {lighterGrey, lightGrey } from 'components/theme/semantic';
import Select from 'components/molecules/UnbundlingAidSelect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export type Value = {
  key: string,
  value: string
}

type Props = {
  aid: string,
  width: number,
  data: any,
  position?: number,
  values: Value[],
  textAlign?: string,
  onMove: (key: string) => void,
  onChange: (key: string, value: string) => void,
};
/* eslint-disable no-unused-vars */
export default class ToolBarItem extends React.Component {
  static getValue(values: Value[], key: string): string {
    // console.log('key ', key, 'values: ', values);
    const obj = values.find(obj => obj.key === key);
    return obj ? obj.value : 'All';
  }
  static reorder(list: string[], startIndex: number, endIndex: number): string[] {
    const [removed] = list.splice(startIndex, 1); // gets a hold of the item
    list.splice(endIndex, 0, removed); // adds item in new place
    return list;
  }
  static getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: ToolBarItem.grid * 2,
    margin: `0 0 ${ToolBarItem.grid}px 0`,
    // change background colour if dragging
    background: isDragging ? lightGrey : lighterGrey,
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  static grid: number = 8;
  // static reorder: (list: string[], startIndex: number, endIndex: number) => string[]
  constructor(props: Props) {
    super(props);
    const keys = Object.keys(this.props.data);
    this.state = {keys};
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  state: {
    keys: string[]
  }
  onDragEnd: (result: Object) => void

  onDragEnd(result: Object) {
    // dropped outside the list
    if (!result.destination) return;
    const keys = ToolBarItem.reorder(
      this.state.keys,
      result.source.index,
      result.destination.index
    );
    console.log('results', result);
    this.props.onMove(result.draggableId);
    this.setState({
      keys
    });
  }

  render() {
    const {
      width,
      data,
      position = 0,
      values,
      textAlign,
      aid,
      onChange
    } = this.props;
    // console.log('values', values);
    return (
      <Grid.Column width={width} textAlign={textAlign || 'right'} verticalAlign="middle">
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <span>{aid}</span>
                  {this.state.keys.map(key => (
                    <Draggable key={key} draggableId={key}>
                      {(provided, snapshot) => (
                        <div
                          style={{height: '30px', marginLeft: '2px', display: 'inline-block'}}
                        >
                          <div
                            ref={provided.innerRef}
                            style={ToolBarItem.getItemStyle(
                              provided.draggableStyle,
                              snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                          >
                            {
                              key === 'years' ?
                                (<Select
                                  key={key}
                                  active
                                  value={ToolBarItem.getValue(values, key)}
                                  options={data.years}
                                  onChange={d => onChange(key, d)}
                                />)
                                :
                                (<Select
                                  key={key}
                                  active={this.state.keys.indexOf(key) <= position}
                                  value={ToolBarItem.getValue(values, key)}
                                  smallText={key}
                                  options={data[key]}
                                  onChange={d => onChange(key, d)}
                                />)
                            }
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

