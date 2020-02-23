import React from 'react'


class Walkthrough extends React.Component {
  constructor(props) {
    super(props)
    this.html = require('./walkthrough.html')
  }

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.html}}/>
  }

}

export default Walkthrough;
// React.module.exports = React.createClass({
//   render: function() {
//     return(
//       <div dangerouslySetInnerHTML={template} />
//     );
//   }
// });
