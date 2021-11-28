import { ReactComponent as Food } from '../public/assets/icons/food.svg';
import { ReactComponent as Lunch } from '../public/assets/icons/lunch.svg';

const SvgFood = (props) => {
    return (
        <>
            <Food fill={props.color} />
        </>
    )
}
const SvgLunch = (props) => {
    return (
        <>
            <Lunch fill={props.color} />
        </>
    )
}

export {SvgFood, SvgLunch}