import { useEffect } from "react";
import $ from "jquery";

const Index = ({ submitForm, onChangeInput, dark }) => {
  useEffect(() => {
    $(".otp-from")
      .find("input")
      .each(function () {
        $(this).attr("maxlength", 1);
        $(this).on("keyup input", function (e) {
          onChangeInput(e.target);
          var parent = $($(this).parent());
          if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find("input#" + $(this).data("previous"));
            if (prev.length) {
              $(prev).select();
            }
          } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            e.keyCode === 39
          ) {
            var next = parent.find("input#" + $(this).data("next"));
            if (next.length) {
              $(next).select();
            } else {
              if (parent.data("autosubmit")) {
                // parent.submit();
                submitForm();
              }
            }
          }
        });
      });
  }, []);

  useEffect(() => {
    $(".form-control").keyup(function () {
      if (this.value.length === this.maxLength) {
        var $next = $(this).next(".form-control");
        if ($next.length) $(this).next(".form-control").focus();
        else $(this).blur();
      }
    });
  }, []);

  return (
    <div className="enter-otp-cont">
      <p className={`sot-heading mt-2 otp-title ${dark && "otp-title-dark"}`}>
        Enter OTP
      </p>
      <form className={`otp-from ${dark && "otp-from-dark"}`}>
        {/* <div className={`otp-from-bord ${dark && "otp-from-bord-dark"}`}> */}
        <input
          inputMode="numeric"
          type="text"
          maxLength="1"
          autoComplete="off"
          className="form-control"
          id="digit-1"
          name="digit-1"
          data-next="digit-2"
          placeholder=""
        />
        {/* </div> */}
        {/* <span className="otp-partion">.</span> */}
        {/* <div className={`otp-from-bord ${dark && "otp-from-bord-dark"}`}> */}
        <input
          inputMode="numeric"
          type="text"
          maxLength="1"
          autoComplete="off"
          className="form-control"
          id="digit-2"
          name="digit-2"
          data-previous="digit-1"
          data-next="digit-3"
          placeholder=""
        />
        {/* <span className="otp-partion">.</span> */}
        {/* </div> */}
        {/* <div className={`otp-from-bord ${dark && "otp-from-bord-dark"}`}> */}
        <input
          inputMode="numeric"
          type="text"
          maxLength="1"
          autoComplete="off"
          className="form-control"
          id="digit-3"
          name="digit-3"
          data-previous="digit-2"
          data-next="digit-4"
          placeholder=""
        />
        {/* <span className="otp-partion">.</span> */}
        {/* </div> */}
        {/* <div className={`otp-from-bord ${dark && "otp-from-bord-dark"}`}> */}
        <input
          inputMode="numeric"
          type="text"
          maxLength="1"
          autoComplete="off"
          className="form-control"
          id="digit-4"
          name="digit-4"
          data-previous="digit-3"
          placeholder=""
        />
        {/* </div> */}
      </form>
    </div>
  );
};

export default Index;
