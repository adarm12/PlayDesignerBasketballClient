import axios from "axios";

export const sendApiGetRequest = (request, callback) => {
    axios.get(request)
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}

export const sendApiPostRequest = (request, params, callback) => {
    axios.post(request, null, {
        params
    }).then(response => {
        if (callback) {
            callback(response);
        }
    })
}

export const sendApiPostRawBody = (request, params, callback) => {
    axios({
        method: "post",
        url: request,
        data: params,
        params: {},

    }).then(response => {
        console.log(response.data)
    })
}