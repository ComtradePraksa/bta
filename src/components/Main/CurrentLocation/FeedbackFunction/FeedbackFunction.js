const getStyle = (rating) => {
    switch (true) {
        case (rating <= 3):
            return {
                backgroundColor: "red",
                width: rating * 10 + "%"
            }
        case (rating <= 7):
            return {
                backgroundColor: "orange",
                width: rating * 10 + "%"
            }
        default:
            return {
                backgroundColor: "green",
                width: rating * 10 + "%"
            }
    }
};

const getType = (type) => {
    switch (type) {
        case "culture":
            return {
                icon: "landmark",
                color: "#5DBCD2"
            }
        case "transportation":
            return {
                icon: "bus",
                color: "#7FBF7F"
            }
        case "food":
            return {
                icon: "hamburger",
                color: "#EE82EE"
            }
        case "sightseeing":
            return {
                icon: "binoculars",
                color: "#384685"
            }
        case "safety":
            return {
                icon: "hard-hat",
                color: "#98615B"
            }
        default:
            return {
                icon: "map-signs",
                color: "#ffa500"
            }

    }
};

export {getType,getStyle}