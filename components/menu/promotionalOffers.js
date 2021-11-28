const Index = ({ onClose, offers }) => {
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
          {offers.map((offer, index) => {
            //  <p key={index}>{offer.offer_type}</p>
            return (
              <div key={index}>
                <p>{offer.offer_type}</p>
                <img
                  width={100}
                  height={100}
                  src={offer.item_details.image_url}
                />
              </div>
            );
          })}
          <button onClick={() => onClose()} className="add-new-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
