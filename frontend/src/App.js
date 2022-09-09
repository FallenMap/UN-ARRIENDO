import './css/inicioDeSesion.css';

function App() {
  return (
    <><head>
      <meta charset="utf-8" />
      <title>Inicio de Sesion</title>
      <link rel="stylesheet" href="inicioDeSesion.css"></link>
    </head> 
    <body>

    <div data-layer="50e51e6c-c6ec-4b2c-9245-bb9be4da9e04" class="inicioDeSesion">
            <div data-layer="9c025e5a-2389-428d-9910-f09fc13cf42d" class="grupo2"> 
                <div data-layer="811d07fd-29cd-4d04-9bf8-e476db6bedf2" class="grupo1">
                    <div data-layer="458b59aa-ba03-44db-a93d-d543bd6c52e3" class="rectangulo1"></div>
                    <svg data-layer="bcf104ab-16a5-4e1b-b947-a32427d8f085" preserveAspectRatio="none" viewBox="-0.75 -0.75 2261.5 1101.5" class="trazado1">
                        <path d="M 0 0 L 2260 0 L 2260 1100 L 0 1100 L 0 0 Z"  />
                    </svg>
                </div>
                
            <div data-layer="8d45aec4-8e59-4af1-8455-facc029045d2" class="unArriendo">UN-ARRIENDO</div>
            <div data-layer="63cde2a9-f377-46a2-adce-155f8d58a260" class="inicioDeSesion1bfaed59">Inicio de sesión</div>

            <div data-layer="50e51e6c-c6ec-4b2c-9245-bb9be4da9e04" class="user">
              <div data-layer="10181515-1bf1-45a6-af52-871bc61b352f" class="nameUser">Usuario</div>
              <input type="text" id="textUser" required minlength="4" maxlength="8"/>
            </div>

            <div data-layer="50e51e6c-c6ec-4b2c-9245-bb9be4da9e04" class="password">
              <div data-layer="10181515-1bf1-45a6-af52-871bc61b352f" class="labelPassword">Contraseña</div>
              <input type="text" id="textPassword" required minlength="4" maxlength="8" size="10"/>
            </div>

            <div data-layer="50e51e6c-c6ec-4b2c-9245-bb9be4da9e04" class="accessButton">
              <button type="submit" class="access">Acceder</button>
            </div>

            <div data-layer="ed6b6cae-ffd1-497e-90d0-0dfd67d10836" class="questions">
              <div data-layer="540720b9-59c9-42d2-bb0a-6f9517a78e04" class="questionPassword">¿Has olvidado tu contraseña?</div>
              <div data-layer="ed6b6cae-ffd1-497e-90d0-0dfd67d10836" class="questionRegister">¿Aún no estás registrado?</div>
            </div>


            <div data-layer="ed6b6cae-ffd1-497e-90d0-0dfd67d10836" class="redirect">
              <a data-layer="315d8d6f-47c3-45d9-b4c4-d67ccf07f79f" class="forgotPassword" href="https://google.com">Haz click aquí</a>
              <a data-layer="8e993241-125a-4cfe-9795-3716ed64aa64" class="register" href="https://google.com">Regístrate ahora</a>  
            </div>
            
            </div>
            </div>
    </body></>
  );
}

export default App;
