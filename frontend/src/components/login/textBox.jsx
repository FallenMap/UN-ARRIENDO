export function TextBox(props){
    return(
    <div className="input-group form-group">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className="fas fa-user" />
      </span>
    </div>
    <input
      type="text"
      className="form-control"
      placeholder={props.Name}
    />
  </div>);
}


