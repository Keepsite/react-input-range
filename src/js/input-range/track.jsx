import React from 'react';
import autobind from 'autobind-decorator';

/**
 * @ignore
 */
export default class Track extends React.Component {
  /**
   * @override
   * @return {Object}
   * @property {Function} children
   * @property {Function} classNames
   * @property {Function} onTrackMouseDown
   * @property {Function} percentages
   */
  static get propTypes() {
    return {
      children: React.PropTypes.node.isRequired,
      classNames: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
      onTrackMouseDown: React.PropTypes.func.isRequired,
      percentages: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
      withActive: React.PropTypes.bool,
      suggestedPercentages: React.PropTypes.objectOf(React.PropTypes.number),
      isMultiValue: React.PropTypes.bool,
      withError: React.PropTypes.bool,
      errorPercentages: React.PropTypes.objectOf(React.PropTypes.number),
    };
  }

  /**
   * @param {Object} props
   * @param {InputRangeClassNames} props.classNames
   * @param {Function} props.onTrackMouseDown
   * @param {number} props.percentages
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;
  }

  /**
   * @private
   * @return {ClientRect}
   */
  getClientRect() {
    return this.node.getBoundingClientRect();
  }

  /**
   * @private
   * @return {Object} CSS styles
   */
  getActiveTrackStyle() {
    const width = `${(this.props.percentages.max - this.props.percentages.min) * 100}%`;
    const left = `${this.props.percentages.min * 100}%`;

    return { left, width };
  }

  getSuggestedTrackStyle() {
    const width = `${(this.props.suggestedPercentages.max - this.props.suggestedPercentages.min) * 100}%`;
    const left = `${this.props.suggestedPercentages.min * 100}%`;

    return { left, width };
  }

  getActiveTrackStyleWithError() {
    const width = `${(this.props.errorPercentages.max - this.props.errorPercentages.min) * 100}%`;
    const left = `${this.props.errorPercentages.min * 100}%`;

    return { left, width };
  }

  /**
   * @private
   * @param {SyntheticEvent} event - User event
   */
  @autobind
  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(event, position);
  }

  /**
   * @private
   * @param {SyntheticEvent} event - User event
   */
  @autobind
  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  /**
   * @override
   * @return {JSX.Element}
   */
  render() {
    let activeTrack;
    if (this.props.withActive && !this.props.isMultiValue && this.props.withError) {
      const activeTrackStyle = this.getActiveTrackStyleWithError();
      activeTrack = (<div style={activeTrackStyle} className={this.props.classNames.activeTrack} />);
    } else if (this.props.withActive) {
      const activeTrackStyle = this.getActiveTrackStyle();
      activeTrack = (<div style={activeTrackStyle} className={this.props.classNames.activeTrack} />);
    }

    let suggestedTrack;
    if (this.props.suggestedPercentages.max !== 0) {
      const suggestedTrackStyle = this.getSuggestedTrackStyle();
      if (!this.props.isMultiValue && !this.props.withError) {
        suggestedTrackStyle.transform = 'translateX(50%)';
      }
      suggestedTrack = (<div style={suggestedTrackStyle} className={this.props.classNames.suggestedTrack} />);
    }

    return (
      <div
        className={this.props.classNames.track}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={(node) => { this.node = node; }}>
        {suggestedTrack}
        {activeTrack}
        {this.props.children}
      </div>
    );
  }
}
