import React from "react";
import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  return (
    <div class="reviews w-75">
      <h3>Các đánh giá còn lại</h3>
      <hr />
      {reviews.map((review) => (
        <div key={review?._id} class="review-card my-3">
          <div class="row">
            <div class="col-1">
              <img
                src={
                  review?.user?.avatar
                    ? review?.user?.avatar?.url
                    : "/images/default_avatar.jpg"
                }
                alt="User Name"
                width="50"
                height="50"
                class="rounded-circle"
              />
            </div>
            <div class="col-11">
              <div class="star-ratings">
                <StarRatings
                  rating={review?.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  startDimension="24px"
                  starSpacing="1px"
                />
              </div>
              <p class="review_user">bởi {review.user?.name}</p>

              <p class="review_comment">{review.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
