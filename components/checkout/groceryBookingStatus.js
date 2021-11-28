import Router from "next/router";

const GroceryBookingStatus = ({ info, retry }) => {
  if (info.status === "") return null;

  return (
    <div className="log-modal-overlay">
      <div className="log-modal">
        <div
          className="log-modal-inner d-flex align-center d-flex-vertical"
          style={{
            bottom: "50%",
            transform: "translate(0px, 50%)",
            width: "calc(100% - 60px)",
            marginLeft: 30,
            borderRadius: "26pt",
          }}
        >
          <img src="/assets/icons/booking_success.svg" />
          <p>Booking {info.status === "success" ? "Successful" : "Failed"}</p>
          {info.status === "success" ? (
            <button
              onClick={() =>
                Router.push(`/my-order/grocery/${info.refcode}?feedback=go`)
              }
              className="add-new-btn"
            >
              Continue
            </button>
          ) : (
            <button onClick={() => retry()} className="add-new-btn">
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryBookingStatus;
