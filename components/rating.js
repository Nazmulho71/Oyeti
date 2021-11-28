// import { BaseStyles } from "../pages/helperComponents/BaseStyles"

const getRatingCmp = (ratingCount) => {
    let cmps = []
    for (let index = 1; index < 6; index++) {
        if (ratingCount >= index) {
            cmps.push(<i key={index} className="fa fa-star"></i>)
        } else if (Math.ceil(ratingCount) >= index) {
            cmps.push(<i key={index} className="fa fa-star-half-alt"></i>)
        } else {
            cmps.push(<i key={index} className="fa fa-star-o"></i>)
        }
    }

    return cmps
}

const Index = ({ ratingCount }) => {
    return (
        <div className="prod-rating">
            {
                getRatingCmp(ratingCount)
            }
        </div>
    )
}


export default Index