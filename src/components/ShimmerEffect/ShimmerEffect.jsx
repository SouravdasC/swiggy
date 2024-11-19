import React from "react";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { ShimmerPostList } from "react-shimmer-effects";

function ShimmerEffect() {
  return (
    <>
      <div>
        <div className="w-full h-[25vh] bg-slate-900">
          <div className="flex justify-center items-center">
            <span class="loader">Loading.....</span>
          </div>
        </div>
        <div>
          <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />;
        </div>
      </div>
    </>
  )
}
export default ShimmerEffect