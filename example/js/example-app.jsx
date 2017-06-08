/* eslint-disable class-methods-use-this, no-console */

import React from 'react';
import InputRange from '../../src/js';

export default class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 25000,
      value2: 10,
      value3: 100000,
      value4: {
        min: 5,
        max: 10,
      },
      value5: 7,
    };
  }

  render() {
    const COMPS_CLASS_NAMES = {
      activeTrack: 'input-range__track input-range__track--active',
      suggestedTrack: 'input-range__track input-range__track--suggested',
      disabledInputRange: 'input-range input-range--disabled',
      inputRange: 'input-range',
      labelContainer: 'input-range__label-container',
      maxLabel: 'input-range__label input-range__label--max',
      minLabel: 'input-range__label input-range__label--min',
      midLabel: 'input-range__label input-range__label--mid',
      errMinLabel: 'input-range__label input-range__label--err-min',
      errMaxLabel: 'input-range__label input-range__label--err-max',
      slider: 'input-range__slider-comps',
      sliderContainer: 'input-range__slider-container',
      track: 'input-range__track input-range__track--background',
      valueLabel: 'input-range__label input-range__label--value',
    };

    return (
      <form className="form">
        <InputRange
          minValue={0}
          maxValue={50000}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          withActive={false}
          suggestedValue={35500}
          step={500}
          classNames={COMPS_CLASS_NAMES}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={20}
          minValue={0}
          disabled
          value={this.state.value2}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={300000}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={this.state.value3}
          withActive={false}
          step={10000}
          onChange={value => this.setState({ value3: value })}
          onChangeStart={value => console.log('onChangeStart with value =', value)}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={20}
          minValue={0}
          labelSuffix="kg"
          value={this.state.value4}
          suggestedValue={{ min: 3, max: 6 }}
          onChange={value => this.setState({ value4: value })}
          onChangeComplete={value => console.log(value)} />

        <InputRange
          maxValue={50}
          minValue={-50}
          formatLabel={value => `${value}%`}
          value={this.state.value5}
          singleValueError={2.5}
          step={0.5}
          classNames={COMPS_CLASS_NAMES}
          suggestedValue={{ min: -4, max: 1 }}
          onChange={value => this.setState({ value5: value })}
          onChangeComplete={value => console.log(value)} />
      </form>
    );
  }
}
