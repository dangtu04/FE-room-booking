import { useEffect, useState } from "react";
import PropertyReviewItem from "./PropertyReviewItem";
import { getReviewsByPropertyId } from "../../utils/api";

const PropertyReview = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getReviewsByPropertyId(propertyId);
      if (res && res.errCode === 0) {
        setReviews(res.data);
        // console.log("check res: ", res.data);
      }
    };
    fetchReviews();
  }, [propertyId]);

  return (
    <>
      {reviews &&
        reviews.length > 0 &&
        reviews.map((review, index) => (
          <PropertyReviewItem key={index} review={review} />
        ))}
    </>
  );
};
export default PropertyReview;
