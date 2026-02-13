import React, { Component } from 'react';

class Title extends Component {
  render() {
    const { name, title } = this.props;

    return (
      <div className="row">
        <div className="col-10 mx-auto my-2 text-center text-title">
          <h1 className="text-capitalize font-weight-bold text-dark">
            {name}{' '}
            <strong className="text-blue">
              {title}
            </strong>
          </h1>
        </div>
      </div>
    );
  }
}

export default Title;
