// @flow
/* eslint-disable */
type Props = {
  children: any
}
export default (props: Props) => (
  <script dangerouslySetInnerHTML={{__html: `(${props.children.toString()})();` }}></script>
);
