import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestPrices} from "../../redux/prices-reducer";
import { getPrices } from "../../redux/users-selectors";

export const Prices = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestPrices())
    },[])

    const prices = useSelector(getPrices)
    console.log(prices)
    return(
        <div>
            {prices.map(el => {
                // @ts-ignore
                return <div key={el.id}>{el.name}</div>
            })}
        </div>
    )
}