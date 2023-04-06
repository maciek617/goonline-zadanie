import React, { Component } from 'react';
import { SingleColorProps } from '../interfaces';

export default class Test extends Component<SingleColorProps> {
  private ref: React.RefObject<HTMLDivElement>;
  constructor(props: SingleColorProps) {
    super(props);
    this.ref = React.createRef();
  }
  removeCustomColor = (index: number) => {
    this.props.setFilteredColors(
      this.props.filteredColors.filter((_, indexColor) => indexColor !== index)
    );
    localStorage.setItem(
      'colors',
      JSON.stringify(
        this.props.filteredColors.filter(
          (_, indexColor) => indexColor !== index
        )
      )
    );
  };

  render() {
    return (
      <div
        data-color={this.props.hexColor}
        ref={(ref) => {
          if (!ref) return;
          ref.style.backgroundColor = this.props.hexColor;
        }}
        className='rectangle'
      >
        {!this.props.isPredefined && (
          <span
            className='remove_color'
            onClick={() => this.removeCustomColor(this.props.index)}
          >
            X
          </span>
        )}
        <p>{this.props.hexColor.toUpperCase()}</p>
      </div>
    );
  }
}
