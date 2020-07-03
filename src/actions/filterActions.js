export const SET_PRICE = "SET_PRICE";
export const SET_SERVICE = "SET_SERVICE";
export const SET_RATING = "SET_RATING";

export function setPrice(price) {
    return {
        type: "SET_PRICE",
        price,
    };
}

export function setService(services) {
    return {
        type: "SET_SERVICE",
        services,
    };
}

export function setRating(rating) {
    return {
        type: "SET_RATING",
        rating,
    };
}
