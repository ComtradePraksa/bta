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

const formatDate = (params) => {
    let formatted = "";
    
    if (params.length === 24) {
        let time = params.split("T")[1].split(":");
        let date = params.split("T")[0].split("-");
        formatted =  `${date[2]}.${date[1]}.${date[0]}. ${time[0]}:${time[1]}`;
    }
    else {
        let time1 = params.split(" ")[1].split(":");
        let date1 = params.split(" ")[0].split("-");
        formatted =  `${date1[2]}.${date1[1]}.${date1[0]}. ${time1[0]}:${time1[1]}`;
    }
    return formatted;
};

const stringForDb = () => {
    const dt = new Date();
    const dtString = dt.toISOString().replace("T", " ");
    return dtString.substring(0, dtString.length - 5);
};

export {getType, getStyle, formatDate, stringForDb};