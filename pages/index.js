import axios from "axios";
import { useState } from "react";

const Home = ({ boekoe }) => {
  const [toko, setToko] = useState(boekoe);
  const [cari, setCari] = useState("");
  function find(e) {
    setCari(e.target.value);
  }
  function submit(e) {
    e.preventDefault();
    const datafind = boekoe.filter(function (list) {
      console.log(boekoe);
      return list.nama.toLowerCase().includes(cari.toLowerCase());
    });

    setToko(datafind);
  }
  console.log(toko);
  return (
    <div>
      {/* Navigation*/}
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
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
        <form
          className="d-flex"
          role="search"
          onSubmit={function (e) {
            submit(e);
          }}
        >
          <input
            onChange={function (e) {
              find(e);
            }}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </nav>
      <header className="bg-primary text-white py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">TOKO BOEKOE</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              Kami Menjual Berbagai Buku Yang Berkualitas
            </p>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {toko.length > 0 ? (
              toko.map((item) => {
                return (
                  <div className="col mb-5">
                    <div className="card h-100">
                      <img
                        className="card-img-top"
                        src={`http://localhost:1337${item.gambar.url}`}
                        alt="..."
                      />
                      <div className="card-body p-4">
                        <div className="text-center">
                          <h5 className="fw-bolder">{item.nama}</h5>
                          <p>{item.detail}</p>
                        </div>
                      </div>
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <a
                            className="btn btn-primary mt-auto"
                            href={`/detail/${item.id}`}
                          >
                            View More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>
                <b>NOT FOUND</b>
              </h2>
            )}
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
export default Home;

export async function getServerSideProps() {
  const respon = await axios.get(`http://localhost:1337/api/items?populate=*`);
  const boekoe = respon.data;
  return {
    props: { boekoe }, // will be passed to the page component as props
  };
}
