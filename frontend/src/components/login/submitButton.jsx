

export function SubmitButton(){

    return(
        <div className="form-group">

            {/* Create submit button */}
            
                  <input
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn"
                    style={{
                      width:"100%"
                    }} 
                  />
                </div>
    );
}