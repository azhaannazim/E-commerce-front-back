import { Rating } from "@mui/material";
import { FaStar } from "react-icons/fa"; // Import FontAwesome star icon

const StarRating = ({ rating }) => {
  return (
    <Rating
      name="read-only"
      value={rating}
      precision={0.5} // Allows half-stars
      readOnly
      icon={<FaStar size={20} color="#FFD700" />} // Golden filled star
      emptyIcon={<FaStar size={20} color="#d1d5db" />} // Gray empty star
    />
  );
};

export default StarRating;
