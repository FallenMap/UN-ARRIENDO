import styles from "../css/renterRegister.module.css";

export function RenterRegister() {
  return (
    <>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      ></link>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.css" />
      {/* Website CSS style */}
      <link rel="stylesheet" type="text/css" href="assets/css/main.css" />
      {/* Website Font style */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
      />
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css?family=Passion+One"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Oxygen"
        rel="stylesheet"
        type="text/css"
      />
      <title>Admin</title>
      <div className="container">
        <div className="row main">
          <div className="panel-heading">
            <div class="panel-title text-center">
              <h1 className={styles.title}>Renter Register</h1>
            </div>
          </div>
          <div className={styles.mainLogin}>
            <form className="form-horizontal" method="post" action="#">
              <div className={styles.formGroup}>
                <label htmlFor="name" className="cols-sm-2 control-label">
                  Your Name
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter your Name"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className="cols-sm-2 control-label">
                  Your Email
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Enter your Email"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className="cols-sm-2 control-label">
                  Your Number Of Contact
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-phone fa-lg" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="number"
                      id="number"
                      placeholder="Enter your number of contact"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="Genre" className="cols-sm-2 control-label">
                  Your description
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <textarea name="description" id="description" cols="30" rows="3"></textarea>
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="username" className="cols-sm-2 control-label">
                  Username
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-users fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      placeholder="Enter your Username"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="Genre" className="cols-sm-2 control-label">
                  Your Genre
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-male fa-lg" aria-hidden="true"  />
                    </span>
                      <select name="Genre" id="Genre" >
                        <option>Masculino</option>
                        <option>Femenino</option>
                      </select>
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirm" className="cols-sm-2 control-label">
                  Password
                </label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      name="confirm"
                      id="confirm"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <button type="button" className={styles.loginButton}>
                  Register
                </button>
              </div>
              <div className={styles.loginRegister}>
                <a href="/">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
