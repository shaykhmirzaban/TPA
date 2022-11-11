import app from "./FirebaseConfig";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
  push,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(app);
const auth = getAuth(app);
const db = getDatabase();

function createUser({ email, password }) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          email: email,
          password: password,
        })
          .then(() => {
            resolve("User account is created successfully");
          })
          .catch(() => {
            reject("User account not created");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorCode, errorMessage);
      });
  });
}

function signInUser({ email, password }) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        resolve("login successfully");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
}

function signOutUser() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        resolve("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        reject(error);
      });
  });
}

function user_is_signin() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(user);
      } else {
        // User is signed out
        reject("user is signed out");
      }
    });
  });
}

function addItem(obj, rootName, id) {
  return new Promise((resolve, reject) => {
    let reference;
    if(id) {
      reference = ref(db, rootName, id);
    } else {
      obj.key = push(ref(db, rootName)).key;
      reference = ref(db, `${rootName}/${obj.key}`);
    }

    set(reference, obj)
      .then(() => {
        resolve("successfully added");
      })
      .catch(() => {
        reject("Something is wrong");
      });
  });
}

function addItemWithoutKey(obj, rootName) {
  return new Promise ((resolve, reject) => {
    let reference = ref(db, rootName);
    set(reference, obj)
      .then(() => {
        resolve("successfully added");
      })
      .catch(() => {
        reject("Something is wrong");
      });
  });
}

function getItem(rootName, id) {
  return new Promise((resolve, reject) => {
    let reference;
    if (id) {
      reference = ref(db, `${rootName}/${id}`);
    } else {
      reference = ref(db, rootName);
    }
    onValue(reference, (snapshort) => {
      if (snapshort.exists) {
        resolve(snapshort.val());
      } else {
        reject("Something is wrong");
      }
    });
  });
}

function updateItem(obj, rootName, id) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, `${rootName}/${id}`);
    update(reference, obj)
      .then(() => {
        resolve("data send successfully");
      })
      .catch(() => {
        reject("data not send");
      });
  });
}

function deleteItem(rootName, id) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, `${rootName}/${id}`);
    remove(reference)
      .then(() => {
        resolve("successfully deleted");
      })
      .catch(() => {
        reject("something is wrong");
      });
  });
}

function deleteAllItem(rootName) {
  return new Promise((resolve, reject) => {
    let reference = ref(db, rootName);
    remove(reference)
      .then(() => {
        resolve("All item is deleted");
      })
      .catch(() => {
        reject("Something is wrong");
      });
  });
}

function uploadImage(file, rootName, data, rootName1) {
  return new Promise((resolve, reject) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = sRef(storage, `${rootName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          set(ref(db, `${rootName1}/${file.lastModified}`), {
            ...data,
            image: downloadURL,
            key: file.lastModified,
          })
            .then(() => resolve(file.lastModified))
            .catch(() => reject("not added"));
        });
      }
    );
  });
}

export {
  createUser,
  signInUser,
  signOutUser,
  user_is_signin,
  addItem,
  addItemWithoutKey,
  getItem,
  updateItem,
  deleteItem,
  deleteAllItem,
  uploadImage,
};
