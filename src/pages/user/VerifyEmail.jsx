import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./VerifyEmail.scss";
import { verifyBooking } from "../../utils/api";
const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isVerified, setIsVerified] = useState(false);
  const language = useSelector((state) => state.app.language);
  const token = queryParams.get("token");
  useEffect(() => {
    const verify = async () => {
      const res = await verifyBooking({token});
      if (res && res.errCode === 0) {
        setIsVerified(true);
      }
    };

    verify();
  }, []);
  return (
    <>
      <div className="verify-email-container">
        {isVerified ? (
          <div className="verify-email-content">
            <p>
              {language === "vi"
                ? "Xác nhận đặt phòng thành công"
                : "Appointment confirmation successful"}
            </p>
          </div>
        ) : (
          <div className="verify-email-content">
            <p>
              {language === "vi"
                ? "Lịch đặt phòng không tồn tại hoặc đã được xác nhận"
                : "Appointment does not exist or has been confirmed"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default VerifyEmail;
