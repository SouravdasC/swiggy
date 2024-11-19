import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import ThirdMenuItems from "./ThirdMenuItems";



function ThirdMenuSec({ card, menuDetails }) {
    // console.log(menuDetails);
    let menuValue = false;
    if (card['@type']) {
        menuValue = true;
    }

    const [value, setValue] = useState(menuValue)
    function toggleFun() {
        setValue(prev => !prev)
    }



    if (card.itemCards) {
        const { title, itemCards } = card;
        // console.log(itemCards?.card)


        return (
            <>
                <div className="mt-4 mb-4">
                    <div className="flex justify-between">
                        <h1 className="font-bold capitalize text-lg tracking-wider">{title} ({itemCards.length})</h1>
                        <span><FaChevronUp onClick={toggleFun} className={`cursor-pointer ${value === false && 'rotate-180 transition-all duration-300t'}`} /></span>
                    </div>

                    {
                        value &&
                        <div className="m-5">
                            {
                                itemCards.map(({ card: { info } }, id) => (
                                    <ThirdMenuItems info={info} key={id} menuDetails={menuDetails} />
                                ))
                            }
                        </div>
                    }
                </div>
                <hr className="bg-gray-200 p-2" />
            </>
        )
    } else {
        const { title, categories } = card;
        return (
            <div>
                <h1>{title}</h1>
                {
                    categories.map(data => (
                        <ThirdMenuSec card={data} key={data.id} />
                    ))
                }
            </div>
        )
    }

}
export default ThirdMenuSec