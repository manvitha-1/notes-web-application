import React from "react";
import pic from "./landingPageImage.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container-fluid landing-page-container">
      <div className="row">
        <div className="col-md-6 divx" id="text-container">
            Welcome to NoteLexicon! 
          <br/><br/>
          Embark on your note-taking journey with
          NoteLexicon, where organization meets elegance. Seamlessly store,
          update, and refine your notes at your leisure. Whether you're
          cataloging brainstorms, drafting agendas, or curating essential
          insights, NoteLexicon empowers you to do so with finesse.
          <br/><br/>
          Our fortified login authentication ensures that your notes remain
          confidential, accessible only to you. Simply authenticate your
          identity to unlock a realm of personalized note management. Should you
          misplace your password, fear not; our password recovery feature stands
          ready to assist. 
          <br/><br/>
          Elevate your organizational prowess and enhance
          productivity with NoteLexicon. Register today and commence your voyage
          toward mastery of note keeping!
        </div>
        <div className="col-md-6">
          <img src={pic} alt="Example Image" height="635px" width="670px"/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
