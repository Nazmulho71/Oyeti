import database from "../enums/db";

let dbName = process.env.NEXT_PUBLIC_LOCAL_DATABASE;

export const _intiatDataBase = () => {
  return new Promise((response, reject) => {
    let request = indexedDB.open(dbName, 11);

    request.onerror = () => {
      console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    request.onupgradeneeded = (e) => {
      let localDb = e.target.result;

      if (!localDb.objectStoreNames.contains(database.CARTS_DB)) {
        let store = localDb.createObjectStore(database.CARTS_DB, {
          keyPath: "id",
        });
        store.createIndex("id", "id", { unique: false });
      }

      if (!localDb.objectStoreNames.contains(database.CATEGORIES_DB)) {
        let store = localDb.createObjectStore(database.CATEGORIES_DB, {
          keyPath: "id",
        });
        store.createIndex("id", "id", { unique: true });
      }

      if (!localDb.objectStoreNames.contains(database.PRODUCTS_DB)) {
        let store = localDb.createObjectStore(database.PRODUCTS_DB, {
          keyPath: "id",
        });
        store.createIndex("id", "id", { unique: true });
      }

      if (!localDb.objectStoreNames.contains(database.PRODUCTS_OFFER_DB)) {
        let store = localDb.createObjectStore(database.PRODUCTS_OFFER_DB, {
          keyPath: "id",
        });
        store.createIndex("id", "id", { unique: true });
      }

      if (!localDb.objectStoreNames.contains(database.STORE_DB)) {
        let store = localDb.createObjectStore(database.STORE_DB, {
          keyPath: "id",
        });
        store.createIndex("id", "id", { unique: true });
      }

      if (!localDb.objectStoreNames.contains(database.UPI_DB)) {
        let store = localDb.createObjectStore(database.UPI_DB, {
          keyPath: "id",
        });
        store.createIndex("id", "id", { unique: true });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      window.db = db;
      return response(db);
    };

    request.onerror = function (e) {
      console.log("onerror!");
      return reject(null);
    };
  });
};
