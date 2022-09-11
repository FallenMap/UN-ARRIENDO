import { RedirectingQuestion } from "./registerQuestion";

export function CardFooter(){
    return(
        
        <div className="card-footer">
          
              <RedirectingQuestion Question="Don't have a account?" url = "https://www.google.com" text="Sign Up" />

              <RedirectingQuestion text="Forgot your password?" url = "https://www.google.com"/>
            </div>
    );
}