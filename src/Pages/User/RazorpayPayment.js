import React, { useState } from "react";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../components/Notify/Notify";
import axios from "../../axios";
import Footer from "../../components/Footer/Footer";

const RazorpayPayment = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };
  const handlePayment = async () => {
    // const orderUrl = "http://localhost:4000/api/razorpay_method/create-order";
    // const verifyUrl =
    //   "http://localhost:4000/api/razorpay_method/verify-payment";
    setIsSubmitting(true);
    // Create order
    const order = await axios.post(`razorpay_method/create-order`, {
      amount: selectedAmount,
    });

    const options = {
      key: "rzp_test_vbShwShGjhk3sg",
      amount: order.data.amount,
      currency: "INR",
      name: "Share More",
      description: "Help Others",
      order_id: order.data.id,
      handler: async (response) => {
        try {
          const token = localStorage.getItem("token"); // Retrieve the token from local storage
          if (!token) {
            throw new Error("No token found. Please log in again.");
          }
          const verifyResponse = await axios.post(
            `razorpay_method/verify-payment`,
            {
              ...response,
              amount: selectedAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            }
          );
          console.log(verifyResponse);
          //   toast.success("🦄Payment Successful:", {
          //     position: "top-right",
          //   });
          //   alert("Payment Successful: " + verifyResponse.data.message);
          // Display a notification to the user
          //             Thank You for Your Generosity!

          // "Your contribution is making a difference. Thank you for your support!"

          // "Thank you for your kind donation. Together, we are making a positive impact!"

          // "We appreciate your generosity. Thank you for supporting our cause!"

          // "Your donation is greatly appreciated. Thank you for helping us make a difference!"

          // "Thank you for your support. Your donation will go a long way in helping those in need!"

          // "Your generosity is making a real difference. Thank you for your support!"

          // "Thank you for your donation. Your kindness is helping us change lives!"

          // "Your support means the world to us. Thank you for your generous donation!"
          toast(
            <Notify
              message={`Thank you for your support!`}
              imgUrl="https://static.vecteezy.com/system/resources/previews/021/186/896/original/bag-of-money-3d-illustration-png.png"
              progressBarColor="red"
            />
          );
          setIsSubmitting(false);
        } catch (error) {
          console.error("Payment verification failed", error);
          //   alert("Payment verification failed");
          toast(
            <Notify
              message={`Payment verification failed`}
              imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
              progressBarColor="red"
            />
          );
        }
      },
      prefill: {
        name: "TEST MODE",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#111",
      },
      method: {
        card: true,
        netbanking: false,
        wallet: false,
        upi: false,
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout form closed");
          setIsSubmitting(false); // Reset isSubmitting state when the modal is dismissed
        },
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <div className="mt-5 pt-5 container">
        <div className="card mt-4">
          <div className="card-body">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <img
                  src="https://img.freepik.com/premium-vector/donate-money-charitable-funds-help-people-flat-vector-illustration_124715-313.jpg"
                  alt="donation_image"
                  className="w-75"
                />
              </div>
              <div className="col-md-6">
                <h5 className="display-7">Select Donation Amount</h5>

                <div className="">
                  <div
                    className="d-flex justify-content-between donation_btn"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className={`btn btn-primary ${
                        selectedAmount === 100 ? "active" : ""
                      }`}
                      onClick={() => handleAmountSelect(100)}
                    >
                      ₹100
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${
                        selectedAmount === 500 ? "active" : ""
                      }`}
                      onClick={() => handleAmountSelect(500)}
                    >
                      ₹500
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${
                        selectedAmount === 1000 ? "active" : ""
                      }`}
                      onClick={() => handleAmountSelect(1000)}
                    >
                      ₹1000
                    </button>
                  </div>
                  <button
                    className="btn btn-primary mt-4 py-3 px-5"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <> Donate ₹{selectedAmount}</>
                    )}
                  </button>
                </div>
              </div>

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RazorpayPayment;
