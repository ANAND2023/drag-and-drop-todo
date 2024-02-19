let allUserData = JSON.parse(localStorage.getItem('allUser')) || [];
export const addUser = (userData) => {
    allUserData.push(userData);
};

export const getAllUsers = () => {
    return allUserData;
};