export function PasswordBox(props) {
  return (
    <div className="input-group form-group">
      <div className="input-group-prepend">

        {/* Import password icon */}
        <span className="input-group-text">
          <i className="fas fa-key" />
        </span>
        
      </div>

      {/* Create input with type password and placeholder argument */}
      <input
        id="user-password-login"
        type="password"
        className="form-control"
        placeholder={props.Name}
        name="password"
      />
      
    </div>
  );
}
