import {Container} from 'react-bootstrap'
const NotFound = () => {
  return (
    <div className="main__content">
        <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
      <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:"center"}}>
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
          height="100%"
          alt="Page not found"
        />
      </div>
    </div>
  );
};

export default NotFound;
