import { db } from '../firebase/firebase'

export const getMyProjects = async (email) => {
    const projects = []
    await db.collection('projects').where('users', 'array-contains', email).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                projects.push({...doc.data(), id: doc.id})
            })
        })
    return projects
}
