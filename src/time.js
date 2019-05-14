import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
const Time = ({time}) => {
    const timeString = moment(time).fromNow();
    return(
        <span className='time'>
            {timeString}
        </span>
    )
};
Time.propTypes = {
    time: PropTypes.string.isRequired
};

//ES6 way of making a component available so it can be imported into other files. 
//default means this component will get when we use import Time from './Time'
export default Time;

// run 'npm run build', 'npm i --save moment'
//import is all about braces. No braces? when importing default
//With braces you are importing a named export. you can mix them  ie import React, {Component} from 'react't
