import { CheckBox } from "./checkBox";
import { SubmitButton } from "./submitButton";
import { TextBox } from "./textBox";
import { PasswordBox } from "./passwordBox";
import { userLoginHandlerOnSubmit } from "../../controllers/userActionsController";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export function CardBody() {
  const auth = useAuth();
  const navigate = useNavigate();
  
  const sumbitHandler = (e) => {
    userLoginHandlerOnSubmit(e, auth, navigate);
  }

  return (
    <div className="card-body">
      {/* Create login form */}
      <form onSubmit={sumbitHandler}>

        {/* Call Textbox component */}
        <TextBox Name="Usuario" />

        {/* Call Passwordbox component */}
        <PasswordBox Name="Contraseña" />

        {/* Call Checkbox component */}
        <CheckBox />

        {/* Call SubmitButton component */}
        <SubmitButton />


        
      </form>
    </div>
  );
}