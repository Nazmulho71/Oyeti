import { useRouter } from "next/router";
let isGrocery = false;
const Index = () => {
  const router = useRouter();
  return (
    <div className={`page-wrapper ${isGrocery ? "grocery" : "qsr"}`}>
      <div className="cart-list-containr">
        <div className="cart-list-inner rating-info">
          <img
            src="/assets/img/no_data.png"
            height="160"
            style={{ borderRadius: "16px", marginTop: "20px" }}
          />
          <p className="mt-3 cr-prod-name mb-0 font-primary font-800 ">
            {" "}
            <button
              style={{ borderRadius: "12px", padding: "6px 10px" }}
              className="add-ord-btn"
              onClick={() => router.back()}
            >
              {" "}
              Add new Item
            </button>
          </p>{" "}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Index;
