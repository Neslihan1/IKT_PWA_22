const db = idb.openDB('posts-store', 1, {
    upgrade(db) {
        const store = db.createObjectStore('posts', {
            keyPath: '_id',
           autoIncrement: true,
        });
       
        store.createIndex('_id', '_id');
    },
});

function writeData(st, data) {
    return db
    .then( dbPosts => {
        let tx = dbPosts.transaction(st, 'readwrite');
        let store = tx.objectStore(st);
        store.put(data);
        return tx.done;
    })
}

function readAllData(st) {
    return db
        .then( dbPosts => {
            let tx = dbPosts.transaction(st, 'readonly');
            let store = tx.objectStore(st);
            return store.getAll();
        })
}

function clearAllData(st) {
    return db
        .then( dbPosts => {
            let tx = dbPosts.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.clear();
            return tx.done;
        })
}

function deleteOneData(st, _id) {
    db
    .then( dbPosts => {
        let tx = dbPosts.transaction(st, 'readwrite');
        let store = tx.objectStore(st);
        store.delete(_id);
        return tx.done;
    })
    .then( () => {
        console.log('Data deleted ...');
    });
}