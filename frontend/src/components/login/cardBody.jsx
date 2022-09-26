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
      <form onSubmit={sumbitHandler}>
        <TextBox Name="Username" />
        <PasswordBox Name="Password" />
        <CheckBox />
        <SubmitButton />
      </form>
    </div>
  );
}