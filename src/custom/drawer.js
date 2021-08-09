import './drawer.css'

function MyDrawer(props) {
  return (
    <div class="drawer">
      <div class="drawer-child title">
        Orders
      </div>
      <div class="drawer-child">
      {props.children}
      </div>
    </div>    
  );
}

export default MyDrawer;