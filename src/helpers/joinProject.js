import axios from 'axios'

import { myFirebase } from '../firebase/firebase'

const URL = 'https://us-central1-bitbeatz-48669.cloudfunctions.net/joinproject'

export async function joinProject(email, code) {
    if (!email || !code) {
        return false
    }

    try {
        const token = await myFirebase.auth().currentUser.getIdToken(false)
        if (!token) throw new Error('Failed to get token')
        const res = await axios({
            method: 'post',
            url: URL,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: {
                user: email,
                code,
            },
        })
        return res.data
    }
    catch (e) {
        console.error(e)
        return false
    }
}