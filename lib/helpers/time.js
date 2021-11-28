import moment from 'moment'

export const getTime = time => {
    return moment(time).format(" MMMM Do, YYYY | hh:mm A")
}

export const getBilTime = time => {
    return moment(time).format(" MMMM Do - hh:mm A")
}