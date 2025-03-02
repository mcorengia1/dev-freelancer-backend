import { addDoc, collection, count, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, serverTimestamp, startAfter, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firestore.js';

const COLLECTION = 'code-snippets';

export class CodeSnippetsModel {
    static async get(id) {
        const docRef = doc(firestore, COLLECTION, id);
        const codeSnippet = await getDoc(docRef);

        if (codeSnippet.exists()) {
            return codeSnippet.data()

        } else {
            throw new Error("Doc doesnt exists")
        }
    }

    static async getAll(pageSize, lastDocId = null) {

        const collectionRef = collection(firestore, COLLECTION);
        const countSnapshot = await getCountFromServer(query(collectionRef))
        const total = countSnapshot.data().count;

        let q;

        if (lastDocId) {
            // Trae el último documento para usar como cursor
            const lastDocSnap = await getDoc(doc(collectionRef, lastDocId));
            q = query(collectionRef, orderBy("updatedAt", "desc"), startAfter(lastDocSnap), limit(pageSize)); 
        } else {
            q = query(collectionRef, orderBy("updatedAt", "desc"), limit(pageSize));
        }

        const querySnapshot = await getDocs(q);

        // Obtener último ID para la próxima página
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]?.id;

        return {
            data: querySnapshot.docs.map(doc => doc.data()),
            nextPageToken: lastVisible || null,
            totalPages: total
        };
    }

    static async create(snippet) {

        await addDoc(collection(firestore, COLLECTION), {
            ...snippet,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        this.updateDocsCount(1)
    }

    static async update(id, codeSnippet) {
        const docRef = doc(firestore, COLLECTION, id);

        await updateDoc(docRef, {
            ...codeSnippet,
            updatedAt: serverTimestamp()
        })

        return
    }

    static async delete(id) {
        const docRef = doc(firestore, COLLECTION, id);
        await deleteDoc(docRef)
        this.updateDocsCount(-1)

        return
    }
}