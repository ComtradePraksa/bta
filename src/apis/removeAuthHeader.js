function removeAuthHeader() {
    let options = {
        transformRequest: [function (data, headers) {
            delete headers.common.Authorization;
            return data;
        }]
    };
    return options;
};


export {removeAuthHeader}