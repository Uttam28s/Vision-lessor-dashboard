import { collection, addDoc, doc, getDocs, getDoc, query, orderBy, updateDoc, deleteDoc, where, setDoc } from "firebase/firestore";
import db from "../firebaseConfig";


export const updateData = async (collectionName, collectionId, data) =>
  new Promise(async (resolve, reject) => {
    // second parameter is collection name and third parameter is collection id
    try {
      await updateDoc(doc(db, collectionName, collectionId), data);
      resolve('data updated successfully')
    } catch (error) {
      reject(error)
    }
  })

export const setData = async (collectionName, collectionId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const docRef =  await setDoc(doc(db, collectionName, collectionId), data);
      if (docRef) {
        resolve(docRef)
      } else {
        resolve("Could not add data to collection")
      }
    }  catch (error) {
      reject(error)
    }
  })

export const addData = async (collectionName, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      if (docRef) {
        resolve(docRef.id)
      } else {
        resolve("Could not add data to collection")
      }
    } catch (error) {
      reject(error)
    }
  })

export const getData = async (collectionName, collectionId) =>
  new Promise(async (resolve, reject) => {
    const docRef = doc(db, collectionName, collectionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      resolve(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      reject('No such document!')
    }
  })

  export const getConditionalData = (collectionName, condition, orderObj) =>
  new Promise(async (resolve, reject) => {
    let q = ''
    if (condition) {
      q = query(collection(db, collectionName), where(condition[0], condition[1], condition[2]));
    } else if (orderObj) {
      q = query(collection(db, collectionName), orderBy(orderObj.fieldName, orderObj.order))
    } else {
      q = collection(db, collectionName)
    }
    try {
      const querySnapshot = await getDocs(q);
      const resData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        resData.push({ id: doc.id, ...doc.data() })
      });
      resolve(resData)
    } catch (error) {
      reject(error)
    }
  });

export const deleteData = async (collectionName, collectionId) =>
  new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, collectionName, collectionId);
      await deleteDoc(docRef);
      resolve('data deleted successfully')
    } catch (error) {
      reject(error)
    }
  })