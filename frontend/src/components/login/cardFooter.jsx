import { RedirectingQuestion } from "./registerQuestion";

export function CardFooter(){
    return(
        
        <div className="card-footer">
          
            {/* Call RedirectingQuestion component with Question, Url and text arguments */}
              <RedirectingQuestion Question="Don't have a account?" url = "/SelectRegister" text="Sign Up" />

            {/* Call again the component but for first sprint isn't create page yet */}
            {/*  <RedirectingQuestion text="Forgot your password?" url = "/changePassword"/>*/}
              
            </div>
    );
}