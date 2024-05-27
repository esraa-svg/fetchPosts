import {useLocation} from 'react-router-dom';

function Details() {
    const location = useLocation();

    return (
        <h1>{location.state.body}</h1>
    )
}
export default Details;