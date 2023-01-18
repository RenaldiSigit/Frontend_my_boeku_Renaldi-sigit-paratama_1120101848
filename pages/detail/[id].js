import axios from "axios";

const Detail = ({ boekoe }) => {
  console.log(boekoe);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            BOEKOE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`http://localhost:1337${boekoe.data.attributes.gambar.data.attributes.url}`}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">
                {boekoe.data.attributes.nama}
              </h1>
              <p className="lead">{boekoe.data.attributes.deskripsi}</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-5 bg-primary text-white">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright © Renaldi Sigit Pratama
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Detail;

export async function getServerSideProps(req, res) {
  const respon = await axios.get(
    `http://localhost:1337/api/items/${req.query.id}?populate=*`
  );
  const boekoe = respon.data;
  console.log(boekoe);
  return {
    props: { boekoe }, // will be passed to the page component as props
  };
}
