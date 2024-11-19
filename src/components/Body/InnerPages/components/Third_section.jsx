import { useState } from "react";
import ThirdMenuSec from "./third-section-com/ThirdMenuSec";
import { FaChevronUp } from "react-icons/fa";



function Third_section({ data, menuDetails }) {
  // console.log(data);

  // const [value, setValue] = useState(true);

  // function toggleFun(index) {
  //   console.log(index);
  //   setValue(value === index ? null : index);

  // }

  return (
    <>
      <div>
        {
          data?.map(({ card: { card } }, index) => (
            <div key={index}>
              <ThirdMenuSec card={card} menuDetails={menuDetails} />

              {/* data.map(({ card: { card: { itemCards, title } } }, index) => ( */}
              {/* <ThirdMenuSec title={title} itemCards={itemCards} /> */}

              {/* <h1>{title} ({itemCards.length})</h1>
              <span><FaChevronUp onClick={() =>toggleFun(index)} className={`cursor-pointer ${value === false && 'rotate-180 transition-all duration-300t'}`} /></span>
              {
                value &&
                itemCards.map(({ card: { info } }, index) => (
                  <div key={index}>
                    <h1>{info.name}</h1>
                  </div>
                ))
              } */}

            </div>
          ))
        }
      </div>
    </>
  )
}
export default Third_section