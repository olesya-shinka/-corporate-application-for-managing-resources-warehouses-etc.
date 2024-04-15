export const getItems = async (token: string) => {
    try {

        const res = await fetch(`https://hcateringback-dev.unitbeandev.com/api/items`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch items');
    }
}

export const login = async (username: String, password: String) => {
    try {
        const res = await fetch(`https://hcateringback-dev.unitbeandev.com/api/authorization/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (res.status === 200) {
            return data.token;
        } else {
            throw new Error(data.message || 'Failed to login');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to login');
    }
}

export async function fetchData() {
    try {
        const token = await login('admin', 'admin');
        const items = await getItems(token);
        console.log(items);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

fetchData();