import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Edit = () => {
    
    const [name, setName] = useState("");
    const [idUser, setIdUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const param = useParams();
    const history = useHistory();
    
    useEffect(() => {
      axios.get(`http://localhost:8000/api/users/${param.id}`)
        .then(resp => {
            setName(resp.data.user.name);
            setIdUser(resp.data.user._id);
        })
        .catch(err => console.log(err))
    }, [])
    
    function onFormSubmit(e){
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/update/${idUser}`, {name})
        .then(resp => {
            if(resp.data.error){
                setErrorMessage(resp.data.error.message);
            }else{
                history.push("/")
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            <h2>Favorite authors</h2>
            <Link to="/">Home</Link>
            <p>Edit this author</p>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <p className="text-danger">{errorMessage === "" ? null : errorMessage}</p>
                </div>
                <Link to="/"><button type="submit" className="btn btn-primary m-1">Cancel</button></Link>
                <button type="submit" className="btn btn-primary m-1">Submit</button>
            </form>
        </>
    )
}

export default Edit