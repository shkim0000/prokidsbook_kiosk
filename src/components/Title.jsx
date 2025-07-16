import React from 'react';

const Title = (props) => {
  return (
    <div className="title" data-progress={props.percents}>
      <div className="inner">
        <button className="icon back" />
        <h2>{props.titleText}</h2>
      </div>
    </div>
  )
}

export default Title
