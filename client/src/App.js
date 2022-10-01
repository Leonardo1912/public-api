import './App.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPublicAPI} from "./store/publicAPIReducer";

function App() {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getPublicAPI())
  },[])

    const [search, setSearch] = useState("")

    const publicAPI = useSelector(state => state.publicAPIPage.publicAPI)

  return (
    <div className="App">
        <div className="search">
          <input type="text" placeholder="Search API" value={search} onChange={event => setSearch(event.target.value)}/>
          <button onClick={()=> dispatch(getPublicAPI(search))}>Search</button>
        </div>
      <div className="main">
        {publicAPI.map(api => <div key={api._id} className="api">
            <div className="item">
                <span className="item-title">API: </span>
                <span className="item-content">{api.API}</span>
            </div>
            <div className="item">
                <span className="item-title">Description: </span>
                <span className="item-content">{api.Description}</span>
            </div>
            <div className="item">
                <span className="item-title">Link: </span>
                <span className="item-content">{api.Link}</span>
            </div>
            <div className="item">
                <span className="item-title">Category: </span>
                <span className="item-content">{api.Category}</span>
            </div>
        </div>)}
      </div>
    </div>
  );
}

export default App;
