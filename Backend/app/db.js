const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://tactile-alloy-241723.firebaseio.com"
});

const firestore = admin.firestore();

let db = {
    contains: function(theatre, date) {
        
        doc = firestore.collection('Dates').doc(date).collection('Theatres').doc(theatre).get()
            .then(doc => {
                console.log('Contains succeded');
                return doc.exists;
            })
            .catch(err => {
                console.log('Contains failed');
            });
        
    },
    get: function(theatre, date) {
        doc = firestore.collection('Dates').doc(date).collection('Theatres').doc(theatre).get()
            .then(doc => {
                console.log('Get successful');
                return doc.data;
            })
            .catch(err => {
                console.log('Get failed');
                return false;
            })
        return doc.data;   
    },
    post: function(theatre, date, data) {
        console.log('Enter post');
        console.log(JSON.stringify(data, null, 2));
        firestore.collection('Dates').doc(date).collection('Theatres').doc(theatre).set(JSON.parse(JSON.stringify(data)))
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
    }
}
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
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          return 0;
        }
  
        // Delete documents in a batch
        let batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
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
  