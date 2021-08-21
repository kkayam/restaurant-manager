import React from 'react';
import ReactFlow from 'react-flow-renderer';
// import initialElements from './sample-elements.js';
import './canvas.css'



class Canvas extends React.Component {

    constructor(props) {
      super(props);

      this.tables_db = this.props.firebase.firestore().collection('tables');
      
      this.state = {
        elements: []
      };

      this.updateNode = this.updateNode.bind(this)

    }

    componentDidMount(){
      this.tables_db.onSnapshot((snap)=> {
        var data = snap.docs.map((element,index) => {
          let data = element.data();
          let table = {
            id:index,
            data:{
              label:(
                index
              )
            },
            position:{ x:data.x,y:data.y}
          };
          return table;
        });
        data.shift();
        console.log(data);
        this.setState({
          elements:data
        });
      })
    }

    updateNode(event,node){
      this.tables_db.doc(node.id).set({
        x:node.position.x,
        y:node.position.y
      })
    }

    render() {
      return (
          <div className="canvas">
              <ReactFlow 
              elements={this.state.elements}
              style={{margin:0}} 
              zoomOnScroll={true} 
              preventScrolling={true} 
              paneMoveable={true} 
              onNodeDragStop={this.updateNode}
              nodesDraggable={true}
              onElementClick={this.props.select_table}/>
          </div>
          
      );
    }
  }
  
  
  export default Canvas;
  
  