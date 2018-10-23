import axios from 'axios';

const URL = 'http://81.177.142.218';
//const URL = 'http://localhost';
const port = 1337;

export const login = (user) => {
    return axios.post(`${URL}:${port}/login`, user)
        .then(response => {
            if (response.status === 200) {
                return response.data.token;
            }
        });
}

export const getUser = () => {
    return axios({
        url: `${URL}:${port}/account`, headers: {
            'x-auth': localStorage.getItem('token'),
        }
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const getTimeTable = (props) => {
    const { faculty, semester, year, level, course } = props;
    const withLevel = level ? `/${level}` : '';
    const withCourse = course ? `/${course}` : '';
    return axios({ url: `${URL}:${port}/timetable/${year}/${semester}/${faculty}${withLevel}${withCourse}` }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const getTimes = (props) => {
    return axios({ url: `${URL}:${port}/times` }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const getAllTimetables = (props) => {
    const faculty = props ? props : '';
    return axios({ url: `${URL}:${port}/timetables/${faculty}` }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const getAllManagersLibraries = (props) => {
    const faculty = props ? props : '';
    return axios({ url: `${URL}:${port}/libraries/manager/${faculty}` }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const getAllAdminsLibraries = (props) => {
    const faculty = props ? props : '';
    return axios({ url: `${URL}:${port}/libraries/admin/${faculty}` }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const deleteLibrary = (props) => {
    const { type, id } = props;
    const url = `${URL}:${port}/${type}/${id}`;
    return axios({
        url, method: 'DELETE', headers: {
            'x-auth': localStorage.getItem('token'),
        }
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const updateLibrary = (props) => {
    const { type, value } = props;
    const url = `${URL}:${port}/${type}/${value._id}`;
    return axios({
        url, method: 'PUT', headers: {
            'x-auth': localStorage.getItem('token'),
        }, data: value
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const addLibrary = (props) => {
    const { type, value } = props;
    const url = `${URL}:${port}/${type}`;
    return axios({
        url, method: 'POST', headers: {
            'x-auth': localStorage.getItem('token'),
        }, data: value
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const addTimetable = (props) => {
    const url = `${URL}:${port}/timetable`;
    return axios({
        url, method: 'POST', headers: {
            'x-auth': localStorage.getItem('token'),
        }, data: props
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const deleteTimetable = (props) => {
    const url = `${URL}:${port}/timetable/${props}`;
    return axios({
        url, method: 'DELETE', headers: {
            'x-auth': localStorage.getItem('token'),
        }
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const updateTimetable = (props) => {
    const { id, subgroups, start, end, groupName } = props;
    const data = {
        groupName,
        subgroups,
        start,
        end,
    }
    const url = `${URL}:${port}/timetable/${id}`;
    return axios({
        url, method: 'PUT', headers: {
            'x-auth': localStorage.getItem('token'),
        }, data
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const addLesson = (props) => {
    const url = `${URL}:${port}/timetable/add`;
    return axios({
        url, method: 'POST', headers: {
            'x-auth': localStorage.getItem('token'),
        }, data: props
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}

export const deleteLesson = (props) => {
    const url = `${URL}:${port}/lesson/${props}`;
    return axios({
        url, method: 'DELETE', headers: {
            'x-auth': localStorage.getItem('token'),
        }
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    });
}