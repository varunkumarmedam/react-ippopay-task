function FormBox() {
  const { useState, useEffect } = React;

  const [showPasswordErrorPopup, setShowPasswordErrorPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [checksData, setChecksData] = useState({});
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isLoadingPasswords, setIsLoadingPasswords] = useState(false);

  useEffect(() => {
    loadSavedPasswords();
  }, []);

  function loadSavedPasswords() {
    setIsLoadingPasswords(true);
    fetch("/all", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setSavedPasswords(data.results);
        setIsLoadingPasswords(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function updatePassword(pass) {
    setPassword(pass);

    const minMaxRegex = /^.{6,20}$/;
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const atleastOneDigitRegex = /\d/;
    const threeRepeatingRegex = /(.)\1\1/;

    const checks = {
      minMax: false,
      lowerCase: false,
      upperCase: false,
      oneDigit: false,
      isNotThreeRepeating: false,
      isValidPassword: true,
    };

    // If any one of the check failed, password is considered as invalid and unabble to save it in database
    if (minMaxRegex.test(pass)) checks.minMax = true;
    else checks.isValidPassword = false;
    if (lowerCaseRegex.test(pass)) checks.lowerCase = true;
    else checks.isValidPassword = false;
    if (upperCaseRegex.test(pass)) checks.upperCase = true;
    else checks.isValidPassword = false;
    if (atleastOneDigitRegex.test(pass)) checks.oneDigit = true;
    else checks.isValidPassword = false;
    if (!threeRepeatingRegex.test(pass)) checks.isNotThreeRepeating = true;
    else checks.isValidPassword = false;

    setChecksData(checks);
  }

  function savePassword() {
    const formData = {
      input: password,
      output: "dummy_output",
    };

    setIsSavingPassword(true);

    // Send data to the server
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((_) => {
        setIsSavingPassword(false); // loading indicator
        setPassword(""); // Clearing password field
        setChecksData({}); // Resetting checks data
        loadSavedPasswords(); // Refresh saved passwords list
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="row col-12 justify-content-around pt-5">
      <div className="col-4 actions-box position-fixed">
        <div className="col-12">
          <input
            className="col-12 form-control"
            type="text"
            id="input"
            name="message"
            placeholder="Enter a password"
            value={password}
            onInput={(val) => updatePassword(val.target.value)}
            onFocus={() => setShowPasswordErrorPopup(true)}
            onBlur={() => setShowPasswordErrorPopup(false)}
          />

          {/* {showPasswordErrorPopup && <p>Showing...</p>} */}
          <center className="mt-3">
            <button
              type="submit"
              className="btn btn-success col-6"
              onClick={() => savePassword()}
              disabled={!checksData.isValidPassword}
            >
              <div class="d-flex align-items-center justify-content-around">
                <span>Save Password</span>

                {isSavingPassword && (
                  <div
                    class="spinner-border spinner-border-sm ml-2"
                    role="status"
                  ></div>
                )}
              </div>
            </button>
          </center>
        </div>
        {showPasswordErrorPopup && (
          <div className="mt-5">
            <p>
              <i
                className={`bi mr-3 ${
                  checksData.minMax
                    ? "bi-check-square text-success"
                    : "bi-x-square text-danger"
                }`}
              ></i>
              Atleast 6 characters and at most 20 characters
            </p>
            <p>
              <i
                className={`bi mr-3 ${
                  checksData.lowerCase
                    ? "bi-check-square text-success"
                    : "bi-x-square text-danger"
                }`}
              ></i>
              Atleast one lowercase letter
            </p>
            <p>
              <i
                className={`bi mr-3 ${
                  checksData.upperCase
                    ? "bi-check-square text-success"
                    : "bi-x-square text-danger"
                }`}
              ></i>
              Atleast one uppercase letter
            </p>
            <p>
              <i
                className={`bi mr-3 ${
                  checksData.oneDigit
                    ? "bi-check-square text-success"
                    : "bi-x-square text-danger"
                }`}
              ></i>
              Atleast one digit
            </p>
            <p>
              <i
                className={`bi mr-3 ${
                  checksData.isNotThreeRepeating
                    ? "bi-check-square text-success"
                    : "bi-x-square text-danger"
                }`}
              ></i>
              Not three repeating characters
            </p>
          </div>
        )}
      </div>

      {/* Dummy element created for flex alignment */}
      <div className="col-4"></div>
      <div className="col-4">
        <h4>Saved passwords</h4>
        {isLoadingPasswords ? (
          <div class="text-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Password</th>
                  <th scope="col">Date Time</th>
                </tr>
              </thead>
              <tbody>
                {savedPasswords.map((password, i) => {
                  return (
                    <tr>
                      <th>{i + 1}</th>
                      <td>{password.input}</td>
                      <td>{password.created_date}</td>
                    </tr>
                  );

                  // <div key={i}>{password.input}</div>;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("form-box")).render(<FormBox />);
