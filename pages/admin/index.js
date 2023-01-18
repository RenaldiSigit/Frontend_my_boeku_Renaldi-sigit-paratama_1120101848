import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function admin({ d_Kategori }) {
  const [namaKat, SetnamaKat] = useState("");
  const [desKat, SetdesKat] = useState("");
  function editNama(e) {
    SetnamaKat(e.target.value);
  }
  function editDes(e) {
    SetdesKat(e.target.value);
  }
  const router = useRouter();
  async function DeleteKat(id) {
    const deleteData = await axios.delete(
      `http://localhost:1337/api/kategoris/${id}`
    );
    alert("Data Terhapus");
    router.replace("/admin");
  }
  async function updateData(e) {
    e.preventDefault();
    const postData = await axios({
      url: "http://localhost:1337/api/kategoris/",
      method: "POST",
      data: {
        data: {
          nama: namaKat,
          deskripsi: desKat,
        },
      },
    });
    alert("Data Berhasil di Tambahkan");
    SetnamaKat(""), SetdesKat("");
    router.replace("/admin");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Admin BOEKOE
          </a>
        </div>
      </nav>
      <div className="container">
        <h1 className="fs-4 text-center">Tambah Kategori</h1>
        <form
          className="p-2"
          onSubmit={function (e) {
            updateData(e);
          }}
        >
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <label>Kategori</label>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="InpKategori"
                  placeholder="input Kategori"
                  onChange={function (e) {
                    editNama(e);
                  }}
                  value={namaKat}
                />
                <label htmlFor="floatingTextarea2">Input Kategori</label>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Deskripsi
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 90 }}
                  defaultValue={""}
                  onChange={function (e) {
                    editDes(e);
                  }}
                  value={desKat}
                />
                <label htmlFor="floatingTextarea2">Input Deskripsi</label>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary mt-3">
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Kategori</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {d_Kategori.data.map((data_kat, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data_kat.attributes.nama}</td>
                  <td>{data_kat.attributes.deskripsi}</td>
                  <td>
                    <Link
                      className="btn btn-warning me-3"
                      href={`/admin/edit/${data_kat.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="Button"
                      className="btn btn-danger"
                      onClick={function () {
                        DeleteKat(data_kat.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      -
    </div>
  );
}
export default admin;

export async function getServerSideProps() {
  const respon = await axios.get(`http://localhost:1337/api/kategoris/`);
  const d_Kategori = respon.data;
  return {
    props: { d_Kategori }, // will be passed to the page component as props
  };
}
