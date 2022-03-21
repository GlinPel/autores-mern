import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NewAuthor = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    function onFormSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/new",{ name })
            .then(resp => {
                if(resp.data.error){
                    setErrorMessage(resp.data.error.message);
                }else{
                    history.push("/")
                }
            })
            .catch( err => console.log(err));
    }
    return (
        <>
            <h2>Favorite authors</h2>
            <Link to="/">Home</Link>
            <p>Add a new author:</p>
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

export default NewAuthor