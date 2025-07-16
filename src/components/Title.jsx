import React from 'react';
import { useNavigate } from "react-router";

const Title = (props) => {
  const navigate = useNavigate();

  return (
    <div className="title" data-progress={props.percents}>
      <div className="inner">
        <button className="icon back" onClick={() => {navigate(-1)}} />
        <h2>{props.titleText}</h2>
      </div>
    </div>
  )
}

export default Title
