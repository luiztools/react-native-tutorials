import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveItem(listItem) {
    listItem.id = new Date().getTime();
    let savedItems = [];
    const response = await AsyncStorage.getItem('items');

    if (response) savedItems = JSON.parse(response);
    savedItems.push(listItem);

    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

function getItems() {
    return AsyncStorage.getItem('items')
        .then(response => {
            if (response)
                return Promise.resolve(JSON.parse(response));
            else
                return Promise.resolve([]);
        })
}

async function getItem(id){
    const savedItems = await getItems();
    return savedItems.find(item => item.id === id);
}

module.exports = {
    saveItem,
    getItems,
    getItem
}