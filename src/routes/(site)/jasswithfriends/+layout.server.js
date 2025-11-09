export const load = ({cookies}) => {
    let id = cookies.get('userid', {path: '/'})
    if(!id) {
        id = crypto.randomUUID()
        cookies.set('userid', id, {path: '/'})
    }
    let username = cookies.get('username', {path: '/'})
    return {
        username: username,
        userid: id
    }
}