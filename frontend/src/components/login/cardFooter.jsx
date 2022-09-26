import { RedirectingQuestion } from "./registerQuestion";

export function CardFooter(){
    return(
        
        <div className="card-footer">
          
              <RedirectingQuestion Question="Don't have a account?" url = "/SelectRegister" text="Sign Up" />

              {/*  <RedirectingQuestion text="Forgot your password?" url = "/changePassword"/>*/}
              
            </div>
    );
}