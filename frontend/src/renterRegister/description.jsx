export function Description(){
    return(
        <div>
            <label htmlFor="description" className="cols-sm-2 control-label">
                Your description
            </label>
            <div className="cols-sm-10">
                <div className="input-group">
                <textarea name="description" id="description" cols="30" rows="3"></textarea>
                </div>
            </div>
        </div>
    );
}