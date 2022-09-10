import { CheckBox } from "./checkBox";
import { SubmitButton } from "./submitButton";
import { TextBox } from "./textBox";

export function CardBody(){
    return(

        <div className="card-body">
              <form>
                <TextBox Name="Username"/>
                <TextBox Name="Password"/>
                <CheckBox/>
                <SubmitButton/>
              </form>
            </div>
    );
}