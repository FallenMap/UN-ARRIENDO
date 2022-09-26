export function TextBox(props){
    return(
    <div className="input-group form-group">
    <div className="input-group-prepend">

      {/* Import textbox icon */}
      <span className="input-group-text">
        <i className="fas fa-user" />
      </span>
      
    </div>

    {/* Create username textbox with placeholder argument */}

    <input
      id="user-name-login"
      type="text"
      className="form-control"
      placeholder={props.Name}
      name="user"
    />
  </div>);
}


