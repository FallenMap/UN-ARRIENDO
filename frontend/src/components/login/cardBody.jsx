import { CheckBox } from "./checkBox";
import { SubmitButton } from "./submitButton";
import { TextBox } from "./textBox";
import { PasswordBox } from "./passwordBox";

export function CardBody(){
    return(

        <div className="card-body">
              <form>
                <TextBox Name="Username"/>
                <PasswordBox Name="Password"/>
                <CheckBox/>
                <SubmitButton/>
              </form>
            </div>
    );
}