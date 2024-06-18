export const getUsers = async () => {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}


export const getUserById = async (id) => {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const user = data.find(user => user.id === id)
        return user;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}