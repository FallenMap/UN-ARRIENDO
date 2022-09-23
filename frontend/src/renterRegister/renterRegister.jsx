import { Link } from "react-router-dom";
import styles from "../css/renterRegister.module.css";
import { ButtonRegister } from "./buttonRegister";
import { Description } from "./description";
import { FormGroup } from "./formGroup";
import { LinksPage } from "./linksPage";
import { ListGenre } from "./selectGenre";
import { TitleRegister} from "./titleRenterRegister";

export function RenterRegister() {
  return (
    <>

      <LinksPage/>
      
      <title>Admin</title>

      <div className="container">

        <div className="row main">

          <TitleRegister title="Renter Register"/>

          <div className={styles.mainLogin}>
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
                <FormGroup name="username" placeholder="Enter your Username" title="Username" image="fa fa-users fa" type="text"/>
              </div>

              <div className={styles.formGroup}>
                <ListGenre/>
              </div>

              <div className={styles.formGroup}>
                <FormGroup name="confirm" placeholder="Enter your password" title="Password" image="fa fa-lock fa" type="password"/>
              </div>

              <div className={styles.formGroup}>
                <ButtonRegister loginButton="Register"/>
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
