import { CheckBox } from "./checkBox";
import { SubmitButton } from "./submitButton";
import { TextBox } from "./textBox";
import { PasswordBox } from "./passwordBox";

export function CardBody(){
    
    const submitHandler = (event)=>{
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      console.log(formData.get('Password'));
      return;
    }
    return(
        <div className="card-body">
              <form onSubmit={submitHandler}>
                <TextBox Name="Username"/>
                <PasswordBox Name="Password"/>
                <CheckBox/>
                <SubmitButton/>
              </form>
            </div>
    );
}