// USE THEM ALL WITH AWAITS
// ---------------------------------

let db;
export function initDatabase() {
    const request = window.indexedDB.open("MockupDatabase", 2);

    request.onerror = e => {
        console.error("DATABASE ERROR -> ", e.target.error);
    }
    request.onsuccess = e => {
        db = e.target.result;
        console.log("database initialised successfully");
    }
    request.onupgradeneeded = e => {
        alert("upgrade needed");
        const db = e.target.result;
        const objectStore = db.createObjectStore("mockup", {
            keyPath : "id",
            autoIncrement : true
        })
    }
}

export function createMockup(mockupInfo) {
    return new Promise((resolve, reject) => {
        const open = window.indexedDB.open("MockupDatabase", 2);
        open.onsuccess = e => {
        
            const db = e.target.result;
        
            const transaction = db.transaction(["mockup"], "readwrite")
            const objectStore = transaction.objectStore("mockup");

            const request = objectStore.add({
                ...mockupInfo
            })
            request.onsuccess = e => {
                console.log(`Created successfully! ${e.target.result}`);
                resolve(e.target.result);
            }
            request.onerror = e => {
                console.log("error creating: ", e.target.error);
                reject(e.target.error);
            }
        }
        open.onerror = e => {
            console.log("error opening: ", e.target.error);
            reject(e.target.error);
        }
    })
}

export function deleteMockup(id) {
    return new Promise((resolve, reject) => {
        const open = window.indexedDB.open("MockupDatabase", 2);
        open.onsuccess = e => {
            const db = e.target.result;
            const transaction = db.transaction(["mockup"], "readwrite");
            const objectStore = transaction.objectStore("mockup");
            const request = objectStore.delete(id);

            request.onsuccess = e => {
                console.log(`Deleted successfully! ${e.target.result}`);
                resolve(e.target.result);
            }
        }
        open.onerror = e => {
            console.log("error opening: ", e.target.error);
            reject(e.target.error);
        }
    })
}

export function editMockup(id, newInfo) {
    return new Promise((resolve, reject) => {
        const open = window.indexedDB.open("MockupDatabase", 2);
        open.onsuccess = e => {
            const db = e.target.result;
            const transaction = db.transaction(["mockup"], "readwrite");
            const objectStore = transaction.objectStore("mockup");

            const getRequest = objectStore.get(id);
            getRequest.onsuccess = e => {
                const prevInfo = e.target.result;
                const completeInfo = {...prevInfo, ...newInfo}

                const putRequest = objectStore.put(completeInfo)

                putRequest.onsuccess = e => {
                    console.log(`Edited successfully! ${e.target.result}`);
                    resolve(e.target.result);
                }
            }
            getRequest.onerror = e => {
                console.log("error getting: ", e.target.error);
                reject(e.target.error);
            }
        }
        open.onerror = e => {
            console.log("error opening: ", e.target.error);
            reject(e.target.error);
        }
    })
}   

export function getAllMockups() {
    return new Promise((resolve, reject) => {
        const open = window.indexedDB.open("MockupDatabase", 2);
        open.onsuccess = e => {
            const db = e.target.result;
            const transaction = db.transaction(["mockup"], "readonly");
            const objectStore = transaction.objectStore("mockup");

            const request = objectStore.getAll();
            request.onsuccess = e => {
                console.log(`Got all mockups successfully! ${e.target.result}`);
                resolve(e.target.result);
            }
        }
        open.onerror = e => {
            console.log("error opening: ", e.target.error);
            reject(e.target.error);
        }
    })
}
