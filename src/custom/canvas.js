import React from 'react';
import ReactFlow from 'react-flow-renderer';
import initialElements from './sample-elements.js';
import './canvas.css'



class Canvas extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        elements: []
      };
  
    }
    render() {
      return (
          <div className="canvas">
              <ReactFlow 
              elements={initialElements} 
              style={{margin:0}} 
              zoomOnScroll={true} 
              preventScrolling={true} 
              paneMoveable={true} 
              nodesDraggable={true}/>
          </div>
          
      );
    }
  }
  
  
  export default Canvas;
  
  