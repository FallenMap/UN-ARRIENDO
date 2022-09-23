import { Link } from "react-router-dom";
import styles from "../css/renterRegister.module.css";
import { ButtonRegister } from "../renterRegister/buttonRegister";
import { Description } from "../renterRegister/description";
import { FormGroup } from "../renterRegister/formGroup";
import { LinksPage } from "../renterRegister/linksPage";
import { TitleRegister} from "../renterRegister/titleRenterRegister";

export function RenterUpdate() {
  return (
    <>

      <LinksPage/>
      
      <title>Admin</title>

      <div className="container">

        <div className="row main">

          <TitleRegister title="Renter Update"/>

          <div className={styles.mainLoginUpdate}>
            <form className="form-horizontal" method="post" action="#">

              <div className={styles.formGroup}>
                <FormGroup name="name" placeholder="Enter your Name" title="Your Name" image="fa fa-user fa" type="text" /> 
              </div>

              <div className={styles.formGroup}>
                <FormGroup name="email" placeholder="Enter your Email" title="Your Email" image="fa fa-envelope fa"  type="text"/>
              </div>

              <div className={styles.formGroup}>
                <FormGroup name="number" placeholder="Enter your number of contact" title="Your Number Of Contact" image="fa fa-phone fa" type="text"/>
              </div>

              <div class={styles.formGroup}>
                <Description/>
              </div>

              <div className={styles.formGroup}>
                <FormGroup name="confirm" placeholder="Enter your password" title="Password" image="fa fa-lock fa" type="password"/>
              </div>

              <div className={styles.formGroup}>
                <ButtonRegister loginButton="Actualizar"/>
              </div>
              
              <div className={styles.loginRegister}>
                <Link to="/">Login </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}