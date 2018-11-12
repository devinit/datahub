import glamorous from 'glamorous';
import { css } from 'glamor';
// import { black, red, white } from '../../theme/semantic';
import { GlamorousComponentT } from '../../types';

export const marginRight = (value: number) => css({ marginRight: `${value}px` });
export const marginLeft = (value: number) => css({ marginLeft: `${value}px` });
export const ContentWrapper: GlamorousComponentT = glamorous.div({
  overflow: 'hidden'
});

export const URLWrapper: GlamorousComponentT = glamorous.div({
  position: 'relative',
  width: '640px',
  minWidth: '640px',
  maxWidth: '640px',
  margin: '0 auto',
  float: 'right'
});

export const CountryProfileLink: GlamorousComponentT = glamorous.a({
  width: '310px',
  backgroundColor: '#F1F1F1',
  display: 'block',
  top: '-10mm',
  right: 0,
  padding: '15px 15px 10px 15px',
  lineHeight: '12px',
  fontSize: '10px',
  float: 'right'
});

export const CountryProfileLinkText: GlamorousComponentT = glamorous.span({
  display: 'block',
  color: '#BA0C2F',
  fontWeight: 700
});

export const CountryProfileLinkDescription: GlamorousComponentT = glamorous.span({
  display: 'block',
  paddingTop: '5px'
});

export const PageTable: GlamorousComponentT = glamorous.table({
  width: '640px',
  minWidth: '640px',
  maxWidth: '640px',
  margin: '0 auto',
  marginTop: '10mm',
  marginBottom: '10mm',
  background: 'white',
  tableLayout: 'fixed',
  minHeight: '28cm',
  maxHeight: '28cm',
  height: '28cm'
});

export const TableCell: GlamorousComponentT = glamorous.td({
  verticalAlign: 'top',
  lineHeight: 'initial'
});

export const PrintHeader: GlamorousComponentT = glamorous.div({
  width: '100%',
  borderBottom: '10px solid #BA0C2F',
  color: '#BA0C2F',
  fontSize: '40pt',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  lineHeight: '0.9em'
});

export const Narrative: GlamorousComponentT = glamorous.div({
  fontSize: '10pt',
  paddingTop: '10px'
});

export const List: GlamorousComponentT = glamorous.ul({
  listStyleType: 'disc',
  padding: 0,
  paddingLeft: '10px',
  margin: '10px 0'
});

export const ListItem: GlamorousComponentT = glamorous.li({
  fontSize: '10pt',
  paddingBottom: '3px',
  listStylePosition: 'outside'
});

export const SectionTitle: GlamorousComponentT = glamorous.span({
  display: 'block',
  fontSize: '16pt',
  color: '#BA0C2F',
  fontWeight: 'bold',
  margin: 0
});

export const GreyBox: GlamorousComponentT = glamorous.div({
  boxSizing: 'border-box',
  position: 'relative',
  backgroundColor: '#F1F1F1',
  textAlign: 'center',
  border: '1px solid #F1F1F1',
  marginLeft: '15px',
  marginBottom: '10px',
  maxHeight: '150px',
  height: '150px',
  padding: '10px 0'
});

export const MutedHeader: GlamorousComponentT = glamorous.h5({
  boxSizing: 'border-box',
  position: 'relative',
  color: '#666',
  fontSize: '10pt',
  lineHeight: '14px',
  verticalAlign: 'top',
  fontWeight: 500,
  display: 'inline-block',
  margin: 0,
  height: 'initial',
  padding: '0 15px'
});

export const ValueHeader: GlamorousComponentT = glamorous.h1({
  color: '#BA0C2F',
  fontSize: '32px',
  lineHeight: '26px',
  margin: '0 auto',
  marginTop: '20px',
  padding: 0,
  textAlign: 'center',
  width: '144px',
  maxWidth: '144px'
});

export const BoxSubHeader: GlamorousComponentT = glamorous.h3({
  margin: '5px 0 0 0',
  color: '#BA0C2F'
});

export const BoxUnit: GlamorousComponentT = glamorous.div({
  fontSize: '9px',
  fontWeight: 'normal',
  color: '#666'
});

export const ChartBoxSmall: GlamorousComponentT = glamorous.div({
  width: '300px',
  height: '180px',
  maxHeight: '180px',
  padding: 0
});

export const ChartBoxLarge: GlamorousComponentT = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '360px',
  maxHeight: '360px',
  padding: 0,
  margin: '0 auto',
  marginBottom: '20px'
});

export const ChartHeading: GlamorousComponentT = glamorous.h5({
  width: '100%',
  color: '#e84439',
  textTransform: 'none',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '12px',
  verticalAlign: 'top',
  // minHeight: '50px',
  padding: 0
});

export const ChartSubHeading: GlamorousComponentT = glamorous.span({
  display: 'block',
  fontWeight: 'normal',
  paddingTop: '3px',
  fontSize: '0.9em'
});

export const ChartAxisLabel: GlamorousComponentT = glamorous.div({
  paddingLeft: '40px',
  color: '#a9a6aa',
  fontSize: '11px',
  textAlign: 'center'
});

export const FooterNotes: GlamorousComponentT = glamorous.div({
  padding: 0,
  fontSize: '8px',
  textAlign: 'justify',
  lineHeight: '11px',
  maxHeight: '115px',
  overflow: 'hidden'
});

export const PageFooter: GlamorousComponentT = glamorous.div({
  paddingTop: 0,
  fontSize: '8px',
  lineHeight: '1em'
});

export const PageFooterText: GlamorousComponentT = glamorous.span({
  display: 'inline',
  color: '#BA0C2F',
  textTransform: 'uppercase',
  letterSpacing: '1px'
});
