import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/")
        .then(resp => setUsers(resp.data.users))
        .catch(err => console.log(err))
    }, [])

    function deleteUser(id){
        axios.delete(`http://localhost:8000/api/users/delete/${id}`)
        .then(resp => {
            const newUsers = users.filter( user => user._id !== id);
            setUsers(newUsers);
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
            <h2>Favorite authors</h2>
            <Link to="/new">Add an author</Link>
            <p>We have quotes by:</p>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Author</th>
                    <th scope="col">Actions available</th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    <Link to={`/edit/${user._id}`}><button type="submit" className="btn btn-primary m-1">Edit</button></Link>
                                    <button type="submit" className="btn btn-primary m-1"
                                        onClick={() => deleteUser(user._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Dashboard