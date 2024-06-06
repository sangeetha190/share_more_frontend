import React from "react";
import blood from "../../../assets/images/banner_image/blood.jpg";
import blood1 from "../../../assets/images/banner_image/blood1.jpg";
import blood2 from "../../../assets/images/banner_image/blood2.jpg";
import blood3 from "../../../assets/images/banner_image/blood4.jpg";
// import bloodDonation from "../../../assets/images/banner_image/blood_donation_1.png";
import bloodBanner from "../../../assets/images/banner_image/blood_banner.png";
import bloodTypes from "../../../assets/images/banner_image/blood_types.png";
import Footer from "../../../components/Footer/Footer";

const Typesofblood = () => {
  return (
    <>
      <div className="mt-5 pt-5 container">
        <div className="text-center pt-5">
          <h1 className="display-4 font-bold mb-0 fw-6">
            <b>
              Facts About <span className="text-danger">Blood</span> and{" "}
              <span className="text-danger">Blood</span> Types
            </b>
          </h1>
          <h5 className="text-muted">Not all blood is alike.</h5>
          {/* <div className="col-md-6"> */}

          {/* </div> */}
        </div>
        <div className="rounded-3" style={{ height: "auto" }}>
          <img
            src={bloodBanner}
            alt="blood_donation"
            className="box-shadow_box rounded-3"
          />
        </div>
        {/* content starts */}
        <div className="row mt-5">
          <div className="col-md-6">
            <h4 className="fw-7 fs-p">WHY SHOUlD I DONATE BlOOD?</h4>
            <p className="fs-6 tx-justify">
              Donating blood is a simple way to save lives. Your blood can help
              people who need surgeries, cancer treatments, or have been in
              accidents. Our community relies completely on volunteer donors
              like you to provide all the blood needed. Most people will need a
              blood transfusion at some point, so your donation helps ensure
              there’s enough for everyone. Donating blood also gives you a quick
              health check and can make you feel good knowing you've helped
              others. By donating blood, you make a big difference in your
              community.
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="fw-7 fs-p">WHEN CAN I DONATE AGAIN?</h4>
            <p className="fs-6 tx-justify">
              You can donate whole blood every three months, allowing your body
              enough time to replenish its blood supply. If you wish to donate
              platelets, you can do so every two weeks, though it is generally
              recommended to wait 14 days between donations. Plasma donors are
              eligible to donate every 15 days. Knowing these intervals helps
              ensure that your donations are safe and effective, and your
              contributions are vital for saving lives and supporting the health
              of our community.
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="fw-7 fs-p">WHO CAN DONATE BlOOD?</h4>
            <p className="fs-6 tx-justify">
              In India, individuals eligible to donate blood are typically aged
              between 18 and 65, with a minimum weight requirement of 50
              kilograms. They should also be in good health, free from major
              illnesses or infections. Those under 18 need written permission
              from a parent or guardian. Meeting these criteria enables
              individuals to contribute to saving lives and supporting community
              health through blood donation.
            </p>
          </div>

          <div className="col-md-6">
            <h4 className="fw-7 fs-p">WHAT HAPPENS TO BlOOD AFTER I DONATE?</h4>
            <p className="fs-6 tx-justify">
              {" "}
              After donating blood in India, it undergoes a few crucial steps.
              First, it's tested for infections like HIV and hepatitis. Next,
              it's separated into different components like red blood cells and
              plasma. Finally, these components are sent to local hospitals and
              trauma centers for transfusions. Your donation directly helps save
              lives and support medical care for those in need.
            </p>
          </div>
        </div>
        {/* content Ends */}
        {/* blood_donation_1 */}
        {/* Blood Types and Transfusion */}
        <div className="text-center mt-50px">
          <h2 className="display-5 font-bold mb-0 fw-6 mb-3">
            <b>
              <span className="text-danger">Blood</span> Types and Transfusion{" "}
            </b>
          </h2>
          {/* <h5 className="text-muted">Not all blood is alike.</h5> */}
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="" style={{ height: "auto" }}>
              <img
                src={bloodTypes}
                alt="blood_donation"
                className="box-shadow_box"
              />
            </div>
          </div>
          <div className="col-md-6">
            {" "}
            <p className="fs-6 tx-justify">
              Ensuring the correct match of blood types for transfusions is
              crucial for patient safety. The right blood transfusion can mean
              the difference between life and death. Blood types must be
              carefully matched to avoid adverse reactions. For example, an
              incompatible transfusion can lead to serious complications,
              including hemolysis (destruction of red blood cells) and other
              life-threatening conditions.
            </p>
            <ul>
              <li className="fs-6 tx-justify mb-2">
                <b>Blood Type Compatibility:</b> Blood is categorized into types
                A, B, AB, and O, each being either Rh-positive or Rh-negative. A
                patient's blood type must match the donor's type.
              </li>
              <li className="fs-6 tx-justify mb-2">
                <b>Rh Factor:</b> Rh-negative blood is given to Rh-negative
                patients, while Rh-positive or Rh-negative blood can be given to
                Rh-positive patients.
              </li>
              <li className="fs-6 tx-justify">
                <b>Plasma Transfusions:</b> For plasma, the rules are reversed.
                AB plasma can be given to any blood type, making it the
                universal plasma donor.
              </li>
            </ul>
          </div>
        </div>

        {/* test starts */}
        <div className="container mt-50px">
          <div className="types_of_blood mx-auto">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tabs-1"
                  role="tab"
                >
                  O Group
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-2"
                  role="tab"
                >
                  AB Group
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-3"
                  role="tab"
                >
                  A Group
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-4"
                  role="tab"
                >
                  B Group
                </a>
              </li>
            </ul>
            {/* Tab panes */}
            <div className="tab-content border rounded-3 border-primary p-3 text-danger border-grey">
              <div
                className="tab-pane active text-center"
                id="tabs-1"
                role="tabpanel"
              >
                {/* <p>First Panel</p> */}
                <div className="" style={{ height: "auto" }}>
                  <img src={blood} alt="O" className="box-shadow_box" />
                </div>
              </div>
              <div className="tab-pane text-center" id="tabs-2" role="tabpanel">
                <div className="" style={{ height: "auto" }}>
                  <img src={blood2} alt="AB" className="box-shadow_box" />
                </div>
              </div>
              <div className="tab-pane text-center" id="tabs-3" role="tabpanel">
                <div className="" style={{ height: "auto" }}>
                  <img src={blood3} alt="A" className="box-shadow_box" />
                </div>
              </div>
              <div className="tab-pane text-center" id="tabs-4" role="tabpanel">
                <div className="" style={{ height: "auto" }}>
                  <img src={blood1} alt="B" className="box-shadow_box" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* test Ends */}
      </div>

      <Footer />
    </>
  );
};

export default Typesofblood;
