export function PasswordBox(props) {
  return (
    <div className="input-group form-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="fas fa-key" />
        </span>
      </div>
      <input
        type="password"
        className="form-control"
        placeholder={props.Name}
        name={props.Name}
      />
    </div>
  );
}
