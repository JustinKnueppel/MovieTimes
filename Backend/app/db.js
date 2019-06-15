const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://tactile-alloy-241723.firebaseio.com'
});

const firestore = admin.firestore();

let db = {
    contains: async function(theatre, date) {
        try {
            doc = await firestore
                .collection('Dates')
                .doc(date)
                .collection('Theatres')
                .doc(theatre)
                .get();

            return doc.exists;
        } catch {
            console.log('Contains failed');
            return false;
        }
    },
    get: async function(theatre, date) {
        try {
            doc = await firestore
                .collection('Dates')
                .doc(date)
                .collection('Theatres')
                .doc(theatre)
                .get();

            return doc.data();
        } catch {
            console.log('Get failed');
            return false;
        }
    },
    post: function(theatre, date, data) {
        firestore
            .collection('Dates')
            .doc(date)
            .collection('Theatres')
            .doc(theatre)
            .set(data)
            .then(resp => {
                console.log('Post successful');
            })
            .catch(err => {
                console.log('Post unsuccessful');
                console.log(data);
            });
    },
    delete: function(date) {
        deleteCollection(firestore, date, 1000);
    },
    getDates: async function() {
        try {
            dates = await firestore.collection('Dates').get();

            return dates;
        } catch {
            console.log('Error getting dates', err);
            return null;
        }
    }
};
module.exports = {
    db: db
};

function deleteCollection(db, collectionPath, batchSize) {
    let collectionRef = db.collection(collectionPath);
    let query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query
        .get()
        .then(snapshot => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                return 0;
            }

            // Delete documents in a batch
            let batch = db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        })
        .then(numDeleted => {
            if (numDeleted === 0) {
                resolve();
                return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        })
        .catch(reject);
}
